import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="">
          <View className=" flex-row items-center mx-[20px] mt-[10px]">
            <TouchableOpacity onPress={() => router.back()}>
              <View className=" w-[45px] h-[45px] justify-center items-center rounded-full">
                <Ionicons name="chevron-back-outline" size={24} />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-center absolute left-1/2 -translate-x-1/2">
              Select Language
            </Text>
          </View>
          <View className="mt-[30px] mx-[20px]">
            <TouchableOpacity className=" py-[20px] flex-row">
              <Text className="text-xl font-medium">🇺🇸 English</Text>
              <View className="absolute right-[20px] -inset-y-0 justify-center">
                <Ionicons size={28} name="checkmark-circle" />
              </View>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇨🇳 中國人</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇷🇺 Русский</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇳🇱 Nederlands</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇫🇷 Français</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇪🇸 Español</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇮🇹 Italiano</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇧🇷 Português</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className=" py-[20px]">
              <Text className="text-xl font-medium">🇸🇪 svenska</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity className="py-[20px]">
              <Text className="text-xl font-medium">🇮🇳 हिंदी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Language;
