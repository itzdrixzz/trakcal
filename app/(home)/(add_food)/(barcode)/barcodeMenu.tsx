import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WheelPickerExpo from "react-native-wheel-picker-expo";

type Props = {
  name: string;
  brand: string;
  servingSizeGrams: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  sugar: number;
  fiber: number;
  sodium: number;
  id: string;
  onBack: () => void;
};

const BarcodeMenu: React.FC<Props> = ({
  name,
  brand,
  servingSizeGrams,
  calories,
  carbs,
  fat,
  protein,
  sugar,
  fiber,
  sodium,
  id,
  onBack,
}) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [fav, setFav] = useState(false);
  const [showPicker, setShowPicker] = useState<Boolean>(false);
  const [servingAmount, setServingAmount] = useState(1);
  const d = new Date();
  const userTimeString =
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0");
  const hour = d.getHours();
  const minutes = d.getMinutes();

  const formatName = (text: string) => {
    if (!text) return "";
    if (text.length <= 16) return text;

    return text.slice(0, 16) + "\n" + text.slice(16);
  };

  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user.id } : "skip",
  );

  const dailyLogs = useQuery(
    api.functions.tracking.getDailyLogByDate,
    user ? { userId: user.id, date: userTimeString } : "skip",
  );

  const addDailyLog = useMutation(api.functions.tracking.addDailyLog);

  const addFoodEntry = useMutation(api.functions.tracking.addFoodEntry);

  const updateDailyLog = useMutation(api.functions.tracking.updateDailyLog);

  const addFavoriteFood = useMutation(api.functions.tracking.addFavoriteFood);

  const deleteFavoriteFood = useMutation(
    api.functions.tracking.deleteFavoriteFood,
  );

  const handleFavorites = async () => {
    if (!user) return;
    if (fav === true) {
      setFav(false);
      await deleteFavoriteFood({ userId: user?.id, productId: id });
    }
    if (fav === false) {
      setFav(true);
      await addFavoriteFood({ userId: user.id, productId: id });
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const submitHandler = async () => {
    if (!user?.id) {
      console.log("No userId yet");
      return;
    }

    console.log(userTimeString);

    const foodCalories = calories * servingAmount;
    const foodProtienGrams = protein * servingAmount;
    const foodFatGrams = fat * servingAmount;
    const foodCarbsGrams = carbs * servingAmount;
    const foodFiberGrams = fiber * servingAmount;
    const foodSugarGrams = sugar * servingAmount;
    const foodSodiumMg = sodium * servingAmount;

    const servingGrams = servingSizeGrams * servingAmount;
    const createdAt = Date.now();

    const mealTime = hour < 12 ? "Breakfast" : hour < 17 ? "Lunch" : "Dinner";

    if (dailyLogs === undefined) {
      console.log("still loading...");
      return;
    }

    let dayId = dailyLogs?._id;

    if (dailyLogs === null) {
      console.log("There is no entry: creating one");

      dayId = await addDailyLog({
        userId: user.id,
        date: userTimeString,
        calories: foodCalories,
        protienGrams: foodProtienGrams,
        fatGrams: foodFatGrams,
        carbsGrams: foodCarbsGrams,
        fiberGrams: foodFiberGrams,
        sugarGrams: foodSugarGrams,
        sodiumMg: foodSodiumMg,
      });

      await addFoodEntry({
        userId: user.id,
        dayId,
        name,
        meal: mealTime,
        servings: servingAmount,
        grams: servingGrams,
        calories: foodCalories,
        protienGrams: foodProtienGrams,
        fatGrams: foodFatGrams,
        carbsGrams: foodCarbsGrams,
        fiberGrams: foodFiberGrams,
        sugarGrams: foodSugarGrams,
        sodiumMg: foodSodiumMg,
        createdAt,
      });

      router.back();
      return;
    }

    const dailyLogDate = dailyLogs.date;

    const newFoodCalories = dailyLogs.calories + foodCalories;
    const newFoodProtienGrams = dailyLogs.protienGrams + foodProtienGrams;
    const newFoodFatGrams = dailyLogs.fatGrams + foodFatGrams;
    const newFoodCarbsGrams = dailyLogs.carbsGrams + foodCarbsGrams;
    const newFoodFiberGrams = dailyLogs.fiberGrams + foodFiberGrams;
    const newFoodSugarGrams = (dailyLogs.sugarGrams ?? 0) + foodSugarGrams;
    const newFoodSodiumMg = (dailyLogs.sodiumMg ?? 0) + foodSodiumMg;

    await updateDailyLog({
      userId: user.id,
      date: dailyLogDate,
      calories: newFoodCalories,
      protienGrams: newFoodProtienGrams,
      fatGrams: newFoodFatGrams,
      carbsGrams: newFoodCarbsGrams,
      fiberGrams: newFoodFiberGrams,
      sugarGrams: newFoodSugarGrams,
      sodiumMg: newFoodSodiumMg,
      steps: dailyLogs.steps ?? 0,
      water: dailyLogs.water ?? 0,
    });

    await addFoodEntry({
      userId: user.id,
      dayId: dayId!,
      name,
      meal: mealTime,
      servings: servingAmount,
      grams: servingGrams,
      calories: foodCalories,
      protienGrams: foodProtienGrams,
      fatGrams: foodFatGrams,
      carbsGrams: foodCarbsGrams,
      fiberGrams: foodFiberGrams,
      sugarGrams: foodSugarGrams,
      sodiumMg: foodSodiumMg,
      createdAt,
    });

    router.back();
  };

  return (
    <SafeAreaView className="bg-white">
      <View className=" h-full">
        <View className=" flex-row mx-5 mt-4">
          <TouchableOpacity onPress={onBack}>
            <View className="rounded-full w-[50px] h-[50px] justify-center items-center">
              <Ionicons name="arrow-back-outline" size={28} color="black" />
            </View>
          </TouchableOpacity>
          <Text className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xl font-medium">
            Scanned Food
          </Text>
        </View>
        <View className=" flex-row mt-8 mx-6">
          <TouchableOpacity onPress={() => handleFavorites()}>
            <Ionicons
              name={fav ? "bookmark" : "bookmark-outline"}
              size={36}
              color={fav ? "#ffe116" : "black"}
            />
          </TouchableOpacity>
          <View className=" border-[1px] border-[#eaeced] rounded-full mx-4 justify-center">
            <TouchableOpacity className="w-full">
              <Text className=" mx-10 font-medium text-lg">
                {hour < 12 ? "Breakfast" : hour < 17 ? "Lunch" : "Dinner"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" flex-row mt-5 mx-6 items-center">
          <Text className="text-2xl font-semibold py-4">
            {formatName(name)}
          </Text>
          <View className=" border-[1px] border-[#eaeced] flex-row absolute right-4 py-3 items-center justify-center px-14 rounded-3xl">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={togglePicker}
            >
              <Text className="text-3xl font-semibold mr-1">
                {servingAmount}
              </Text>
              <Ionicons name="pencil-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-6 mt-12">
          <View className="flex-row  border-[1px] border-[#eaeced] rounded-lg items-center">
            <Ionicons
              className="py-4 mx-5"
              name="flame"
              size={50}
              color="#ff732e"
            />
            <View className="">
              <Text className="text-lg font-normal">Calories</Text>
              <Text className="text-5xl font-semibold">
                {calories * servingAmount}
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2 mt-2">
            <View className=" border-[1px] border-[#eaeced] flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <FontAwesome5 name="drumstick-bite" size={24} color="#dc6667" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Protein</Text>
                  <Text className="text-3xl font-semibold">
                    {protein * servingAmount}g
                  </Text>
                </View>
              </View>
            </View>
            <View className=" border-[1px] border-[#eaeced] flex-row flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <FontAwesome5 name="apple-alt" size={24} color="#db9461" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Carbs</Text>
                  <Text className="text-3xl font-semibold">
                    {carbs * servingAmount}g
                  </Text>
                </View>
              </View>
            </View>
            <View className=" border-[1px] border-[#eaeced] flex-row flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <Ionicons name="fish" size={24} color="#6897de" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Fats</Text>
                  <Text className="text-3xl font-semibold">
                    {fat * servingAmount}g
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className=" mt-10">
            <Text className="text-2xl font-semibold">Ingredients</Text>
            <View className="absolute right-5 inset-y-0 justify-center">
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="add-outline" size={20} color="black" />
                <Text className="text-lg font-medium ml-1">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className=" border-[1px] border-[#eaeced] mt-2 rounded-lg">
            <Text className="py-8 text-center font-medium text-lg">
              No Ingredients Found!
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={submitHandler}
          className="bg-black rounded-full absolute bottom-4 inset-x-0 mx-5"
        >
          <Text className="text-center my-6 text-xl font-semibold text-white">
            Log Food
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <View className="absolute inset-0 z-50">
            <Pressable className="absolute inset-0" onPress={togglePicker} />

            <View className="absolute bottom-0 left-0 right-0">
              <View className="bg-white w-full h-[280px] pt-4 justify-center border-t-[1px]">
                <WheelPickerExpo
                  height={200}
                  width={Dimensions.get("window").width}
                  items={Array.from({ length: 20 }, (_, i) => ({
                    label: (i + 1).toString(),
                    value: i + 1,
                  }))}
                  initialSelectedIndex={servingAmount - 1}
                  onChange={({ index }) => setServingAmount(index + 1)}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BarcodeMenu;
