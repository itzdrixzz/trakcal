import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Personal = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );
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
            {t(
              "settingsPage.accountSection.personalDetailsPage.personalDetailsHeaderText",
            )}
          </Text>
        </View>
        <View className=" mx-[30px] mt-[40px] flex-row rounded-lg border-[1px] border-[#eaeced] h-[70px]">
          <View className=" ml-[10px] justify-center w-[200px]">
            <Text className="text-lg font-medium">
              {t(
                "settingsPage.accountSection.personalDetailsPage.goalWeightText",
              )}
            </Text>
            <Text className="font-bold text-lg">200 kg</Text>
          </View>
          <View className=" justify-center absolute right-[10px] -inset-y-0">
            <TouchableOpacity className="bg-[#000000] rounded-full py-[5px] px-[10px]">
              <Text className="text-white">
                {t(
                  "settingsPage.accountSection.personalDetailsPage.changeGoalButton",
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" mx-[30px]  mt-[20px] rounded-lg border-[1px] border-[#eaeced]">
          <TouchableOpacity className="ml-[20px] my-[15px] flex-row">
            <Text className="font-medium">
              {t(
                "settingsPage.accountSection.personalDetailsPage.currentWeightText",
              )}
            </Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">
                {convexUser?.weightKg} kg
              </Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">
              {t("settingsPage.accountSection.personalDetailsPage.heightText")}
            </Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">
                {convexUser?.heightCm} cm
              </Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">
              {t("settingsPage.accountSection.personalDetailsPage.ageText")}
            </Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">
                {convexUser?.age} Years Old
              </Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">
              {t("settingsPage.accountSection.personalDetailsPage.genderText")}
            </Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">
                {convexUser?.gender}
              </Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
          <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
          <TouchableOpacity className="ml-[20px] my-[15px]">
            <Text className="font-medium">
              {t(
                "settingsPage.accountSection.personalDetailsPage.dailyStepGoal",
              )}
            </Text>
            <View className="flex-row absolute right-[20px]">
              <Text className="mr-[10px] text-lg font-semibold">
                {convexUser?.steps}
              </Text>
              <Ionicons name="pencil-outline" size={18} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Personal;
