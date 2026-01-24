import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      router.replace("/(auth)/welcome-screen");
    }
  }, [isLoaded, isSignedIn, user]);

  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );

  return (
    <SafeAreaView className=" h-full flex-1">
      <View className="">
        <View className=" flex-row items-center mx-[20px] mt-[10px]">
          <TouchableOpacity onPress={() => router.back()}>
            <View className=" w-[45px] h-[45px] justify-center items-center rounded-full">
              <Ionicons name="chevron-back-outline" size={24} />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-center absolute left-1/2 -translate-x-1/2">
            {t("settingsPage.editProfilePage.editProfileHeaderText")}
          </Text>
        </View>
        <View className=" mx-[20px] items-center justify-center mt-[30px]">
          <Image
            source={{ uri: user?.imageUrl }}
            width={100}
            height={100}
            className="rounded-full"
          ></Image>
          <Text className="mt-[10px] text-sm font-normal">Change Photo</Text>
        </View>
        <View className=" mx-[15px] mt-[15px]">
          <View className=" border-[1px] border-[#eaeced] rounded-lg h-[70px] mb-[10px]">
            <Text className=" text-sm font-medium px-[10px] pt-[10px]">
              {t("settingsPage.editProfilePage.firstNameTextInputText")}
            </Text>
            <TextInput
              placeholder={convexUser?.firstName}
              className=" mx-[10px] h-[40px] text-neutral-950"
            ></TextInput>
          </View>
          <View className=" border-[1px] border-[#eaeced] rounded-lg h-[70px] mb-[10px]">
            <Text className=" text-sm font-medium px-[10px] pt-[10px]">
              {t("settingsPage.editProfilePage.lastNameTextInputText")}
            </Text>
            <TextInput
              placeholder={convexUser?.lastName}
              className=" mx-[10px] h-[40px] text-neutral-950"
            ></TextInput>
          </View>
          <View className=" border-[1px] border-[#eaeced] rounded-lg h-[70px]">
            <Text className=" text-sm font-medium px-[10px] pt-[10px]">
              {t("settingsPage.editProfilePage.usernameTextInputText")}
            </Text>
            <TextInput
              placeholder={convexUser?.username}
              className=" mx-[10px] h-[40px] text-neutral-950"
            ></TextInput>
          </View>
        </View>
      </View>
      <View className="absolute bottom-[50px] inset-x-0">
        <TouchableOpacity className="py-[18px] rounded-full items-center mx-[20px] bg-[#000000]">
          <Text className="text-[#ffffff] text-xl font-medium">
            {t("settingsPage.editProfilePage.continueButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
