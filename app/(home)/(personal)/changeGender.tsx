import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeGender = () => {
  const { user } = useClerk();
  const { t } = useTranslation();
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );
  const ChangeGender = useMutation(api.functions.user.changeUserGender);
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | null>(
    null,
  );
  const GenderOptions: ("Male" | "Female" | "Other")[] = [
    "Male",
    "Female",
    "Other",
  ];

  const handleSubmit = async () => {
    if (!user || !convexUser || !gender) return;
    if (
      convexUser.gender === undefined ||
      convexUser.age === undefined ||
      convexUser.heightCm === undefined ||
      convexUser.weight === undefined
    )
      return;
    if (!user) return;
    const bmr =
      gender === "Male"
        ? 10 * (convexUser.weight / 2.20462) +
          6.25 * convexUser.heightCm -
          5 * convexUser.age +
          5
        : 10 * (convexUser.weight / 2.20462) +
          6.25 * convexUser.heightCm -
          5 * convexUser.age -
          161;
    await ChangeGender({ userId: user.id, gender: gender, bmr: bmr });
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
            <View className="h-[3px] bg-[#000000] w-[42px] rounded-full" />
          </View>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">
          {t(
            "settingsPage.accountSection.personalDetailsPage.currentGenderPage.currentGenderHeaderText",
          )}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View>
          {GenderOptions.map((option, Index) => (
            <TouchableOpacity
              key={Index}
              onPress={() => setGender(option)}
              className={`py-[25px] w-[340px] mb-[10px] rounded-2xl items-center ${gender === option ? "bg-[#000000]" : "bg-[#f2f2f2]"}`}
            >
              <Text
                className={`${gender === option ? "text-white" : "text-black"} font-semibold`}
              >
                {option === "Male"
                  ? t(
                      "settingsPage.accountSection.personalDetailsPage.currentGenderPage.maleButtonText",
                    )
                  : option === "Female"
                    ? t(
                        "settingsPage.accountSection.personalDetailsPage.currentGenderPage.femaleButtonText",
                      )
                    : t(
                        "settingsPage.accountSection.personalDetailsPage.currentGenderPage.otherButtonText",
                      )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="mb-[50px] mx-[25px]">
        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={!gender}
          className={`py-[22px] rounded-full items-center ${gender ? "bg-[#000000]" : "bg-gray-300"}`}
        >
          <Text className="text-[#ffffff] text-xl font-medium">
            {t(
              "settingsPage.accountSection.personalDetailsPage.currentGenderPage.submitButton",
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangeGender;
