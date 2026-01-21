import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Personal = () => {
  return (
    <SafeAreaView>
      <View className="">
        <View className=" flex-row items-center mx-[20px] mt-[10px]">
          <TouchableOpacity onPress={() => router.back()}>
            <View className=" w-[45px] h-[45px] justify-center items-center rounded-full">
              <Ionicons name="chevron-back-outline" size={24} />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center absolute left-1/2 -translate-x-1/2">
            Edit Profile
          </Text>
        </View>
        <View className=" mx-[30px] mt-[40px] flex-row rounded-lg border-[1px] h-[70px]">
          <View className=" ml-[10px] justify-center w-[200px]">
            <Text className="text-lg font-medium">Goal Weight</Text>
            <Text className="font-bold text-lg">200 kg</Text>
          </View>
          <View className=" justify-center absolute right-[10px] -inset-y-0">
            <TouchableOpacity className="bg-[#000000] rounded-full py-[5px] px-[10px]">
              <Text className="text-white">Change Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" mx-[30px]  mt-[20px] rounded-lg border-[1px]">
          <TouchableOpacity className="ml-[20px] my-[15px] flex-row">
            <Text className="font-medium">Current Weight</Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">303.4 kg</Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">Height</Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">185 cm</Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">Date of Birth</Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">8/20/2007</Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">Gender</Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">Female</Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">Daily Step Goal</Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">10,000</Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Personal;
