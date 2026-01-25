import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeHeight = () => {
  const { user } = useClerk();
  const { t } = useTranslation();
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );
  const [heightCm, setHeight] = useState<number>(Number(convexUser?.heightCm));
  const ChangeHeight = useMutation(api.functions.user.changeUserHeight);
  const handleSubmit = async () => {
    if (
      convexUser?.heightCm === undefined ||
      convexUser.weight === undefined ||
      convexUser.age === undefined
    )
      return;
    if (!user) return;
    const heightInches = heightCm / 2.54;
    const bmi = (convexUser.weight / heightInches ** 2) * 703;
    const bmr =
      convexUser.gender === "Male"
        ? 10 * (convexUser.weight / 2.20462) +
          6.25 * heightCm -
          5 * convexUser.age +
          5
        : 10 * (convexUser.weight / 2.20462) +
          6.25 * heightCm -
          5 * convexUser.age -
          161;

    await ChangeHeight({
      userId: user.id,
      heightCm: heightCm,
      bmi: bmi,
      bmr: bmr,
    });
    router.back();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons
              className="pt-[10px] pl-[25px] mr-[5px]"
              size={25}
              name="arrow-back-outline"
            />
          </Pressable>
          <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
            <View className="h-[3px] bg-[#000000] w-[210px] rounded-full" />
          </View>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">
          {t(
            "settingsPage.accountSection.personalDetailsPage.currentHeightPage.currentHeightHeaderText",
          )}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="w-full justify-center items-center">
          <Text className="text-lg font-medium mb-[10px]">
            {t(
              "settingsPage.accountSection.personalDetailsPage.currentHeightPage.changeHeightText",
            )}
          </Text>
          <Text className="text-5xl font-bold mb-[20px]">
            {String(heightCm) || convexUser?.heightCm} CM
          </Text>
          <View className="w-full px-[25px]">
            <Slider
              minimumValue={1}
              maximumValue={300}
              step={1}
              value={Number(heightCm) || 150}
              onValueChange={setHeight}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#dddddd"
              thumbTintColor="#ffffff"
            />
          </View>
        </View>
      </View>
      <View className="mb-[50px] mx-[25px]">
        <TouchableOpacity
          onPress={() => handleSubmit()}
          className="py-[22px] rounded-full items-center bg-[#000000]"
        >
          <Text className="text-[#ffffff] text-xl font-medium">
            {t(
              "settingsPage.accountSection.personalDetailsPage.currentHeightPage.submitButton",
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeHeight;
