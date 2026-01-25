import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeSteps = () => {
  const { user } = useClerk();
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );
  const [steps, setSteps] = useState<number>(10000);
  const stepsFormatted = steps.toLocaleString();

  const ChangeSteps = useMutation(api.functions.user.changeUserStepGoal);

  const handleSubmit = async () => {
    if (!convexUser || !user || !steps) return;

    await ChangeSteps({ userId: user.id, steps: steps });
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
          Whats your daily step goal?
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="w-full justify-center items-center">
          <Text className="text-lg font-medium mb-[10px]">Change Steps</Text>
          <Text className="text-5xl font-bold mb-[20px]">
            {stepsFormatted} Steps
          </Text>
          <View className="w-full px-[25px]">
            <Slider
              minimumValue={1000}
              maximumValue={20000}
              step={1000}
              value={Number(steps)}
              onValueChange={setSteps}
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
          <Text className="text-[#ffffff] text-xl font-medium">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeSteps;
