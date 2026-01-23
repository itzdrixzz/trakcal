import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Reminders = () => {
  return (
    <SafeAreaView>
      <View className="">
        <View className="  flex-row items-center mx-[20px] mt-[10px]">
          <TouchableOpacity onPress={() => router.back()}>
            <View className=" w-[45px] h-[45px] justify-center items-center rounded-full">
              <Ionicons name="chevron-back-outline" size={24} />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center absolute left-1/2 -translate-x-1/2">
            Reminders
          </Text>
        </View>
        <View className="mx-[20px] border-[1px] border-[#eaeced] mt-[30px] rounded-lg h-[100px]">
          <Text className="text-base font-medium mt-[10px] ml-[10px]">
            Notifications are currently disabled for Trakcal. To enable, please
            go to system settings.
          </Text>
          <TouchableOpacity className="flex-row items-center ml-[10px] mt-[5px]">
            <Text className="text-lg font-semibold">Open Settings</Text>
            <Ionicons name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View className=" mx-[20px] mt-[40px]">
          <Text className="text-3xl font-bold text">Tracking Reminders</Text>
          <View className="">
            <View className=" mt-[30px] border-[1px] border-[#eaeced] rounded-lg">
              <View className=" mx-[10px] my-[10px] items-center flex-row">
                <Text className="text-lg font-semibold py-[10px]">
                  Breakfast
                </Text>
                <TouchableOpacity className="bg-[#000000] rounded-full absolute right-[15px] py-[10px] px-[15px]">
                  <Text className="text-white">8:30 AM</Text>
                </TouchableOpacity>
              </View>
              <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
              <View className=" mx-[10px] my-[10px] items-center flex-row">
                <Text className="text-lg font-semibold py-[10px]">Lunch</Text>
                <TouchableOpacity className="bg-[#000000] rounded-full absolute right-[15px] py-[10px] px-[15px]">
                  <Text className="text-white">11:30 AM</Text>
                </TouchableOpacity>
              </View>
              <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
              <View className=" mx-[10px] my-[10px] items-center flex-row">
                <Text className="text-lg font-semibold py-[10px]">Snack</Text>
                <TouchableOpacity className="bg-[#000000] rounded-full absolute right-[15px] py-[10px] px-[15px]">
                  <Text className="text-white">4:00 PM</Text>
                </TouchableOpacity>
              </View>
              <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
              <View className=" mx-[10px] my-[10px] items-center flex-row">
                <Text className="text-lg font-semibold py-[10px]">Lunch</Text>
                <TouchableOpacity className="bg-[#000000] rounded-full absolute right-[15px] py-[10px] px-[15px]">
                  <Text className="text-white">6:00 PM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Reminders;
