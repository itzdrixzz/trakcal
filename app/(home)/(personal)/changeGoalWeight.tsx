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

const ChangeGoalWeight = () => {
  const { user } = useClerk();
  const { t } = useTranslation();
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );
  const [desiredWeight, setDesiredWeight] = useState<number>(
    Number(convexUser?.desiredWeight),
  );
  const changeUserWeightGoal = useMutation(
    api.functions.user.changeUserWeightGoal,
  );

  const handleSubmit = async () => {
    if (!user) return;
    await changeUserWeightGoal({
      userId: user?.id,
      desiredWeight: desiredWeight,
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
            "settingsPage.accountSection.personalDetailsPage.changeGoalPage.goalWeightHeaderText",
          )}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="w-full justify-center items-center">
          <Text className="text-lg font-medium mb-[10px]">
            {t(
              "settingsPage.accountSection.personalDetailsPage.changeGoalPage.changeGoalText",
            )}
          </Text>
          <Text className="text-5xl font-bold mb-[20px]">
            {desiredWeight || convexUser?.desiredWeight} LB
          </Text>
          <View className="w-full px-[25px]">
            <Slider
              minimumValue={1}
              maximumValue={300}
              step={1}
              value={Number(desiredWeight) || 150}
              onValueChange={setDesiredWeight}
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
              "settingsPage.accountSection.personalDetailsPage.changeGoalPage.submitButton",
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeGoalWeight;
