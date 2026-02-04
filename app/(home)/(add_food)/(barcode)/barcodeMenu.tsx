import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  onBack,
}) => {
  const [fav, setFav] = useState(false);
  const userTime = new Date();
  const hour = userTime.getHours();
  const minutes = userTime.getMinutes();

  const formatName = (text: string) => {
    if (!text) return "";
    if (text.length <= 16) return text;

    return text.slice(0, 16) + "\n" + text.slice(16);
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
          <TouchableOpacity onPress={() => setFav(!fav)}>
            <Ionicons
              name={fav ? "bookmark" : "bookmark-outline"}
              size={36}
              color={fav ? "#ffe116" : "black"}
            />
          </TouchableOpacity>
          <View className=" border-[1px] border-[#eaeced] rounded-full mx-4 justify-center">
            <TouchableOpacity className="w-full">
              <Text className=" mx-10 font-medium text-lg">
                {hour}:{minutes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" flex-row mt-5 mx-6 items-center">
          <Text className="text-2xl font-semibold py-4">
            {formatName(name)}
          </Text>
          <View className=" border-[1px] border-[#eaeced] flex-row absolute right-4 py-3 items-center justify-center px-14 rounded-3xl">
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-3xl font-semibold mr-1">1</Text>
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
              <Text className="text-5xl font-semibold">{calories}</Text>
            </View>
          </View>
          <View className="flex-row gap-2 mt-2">
            <View className=" border-[1px] border-[#eaeced] flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <FontAwesome5 name="drumstick-bite" size={24} color="#dc6667" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Protein</Text>
                  <Text className="text-3xl font-semibold">{protein}g</Text>
                </View>
              </View>
            </View>
            <View className=" border-[1px] border-[#eaeced] flex-row flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <FontAwesome5 name="apple-alt" size={24} color="#db9461" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Carbs</Text>
                  <Text className="text-3xl font-semibold">{carbs}g</Text>
                </View>
              </View>
            </View>
            <View className=" border-[1px] border-[#eaeced] flex-row flex-1 rounded-lg">
              <View className="flex-row ml-2 mt-2">
                <Ionicons name="fish" size={24} color="#6897de" />
                <View className=" ml-2 mt-1 mb-3">
                  <Text className="text-base">Fats</Text>
                  <Text className="text-3xl font-semibold">{fat}g</Text>
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
        <TouchableOpacity className="bg-black rounded-full absolute bottom-4 inset-x-0 mx-5">
          <Text className="text-center my-6 text-xl font-semibold text-white">
            Log Food
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BarcodeMenu;
