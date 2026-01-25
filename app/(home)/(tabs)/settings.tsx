import { api } from "@/convex/_generated/api";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );

  const signOutAlert = async () => {
    Alert.alert("Logout", "Are you sure you want to Logout?", [
      { text: "Logout", style: "destructive", onPress: () => handleSignOut() },
      { text: "Cancel", style: "default" },
    ]);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/(auth)/sign-in");
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="bg-[#ffffff] flex-1">
      <ScrollView>
        <Text className="text-4xl font-bold mx-[20px] mt-[10px] mb-[20px]">
          {t("settingsPage.profileHeaderText")}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(home)/(edit_profile)/edit_profile")}
        >
          <View className="bg-[#ffffff] border-[1px] border-[#eaeced] flex-row mx-[20px] rounded-3xl">
            <Image
              source={{ uri: user?.imageUrl }}
              width={80}
              height={80}
              className="rounded-full m-[10px] ml-[20px]"
            ></Image>
            <View className="my-[10px] ml-[10px] justify-center">
              <Text className="text-lg font-bold">
                {convexUser?.firstName} {convexUser?.lastName}
              </Text>
              <Text className="text-md font-normal">
                @{convexUser?.username}
              </Text>
            </View>
            <View className="absolute right-[10px] inset-y-0 justify-center">
              <Ionicons
                name="chevron-forward-outline"
                size={32}
                color="#5b5b5c"
              />
            </View>
          </View>
        </TouchableOpacity>
        <View className="mx-[20px] mt-[30px] flex-1">
          <Text className="text-lg font-semibold text-[#7b7b7c]">
            {t("settingsPage.accountSection.accountHeaderText")}
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity
              onPress={() => router.push("/(home)/(personal)/personal")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="person-circle-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.accountSection.personalDetailsButton")}
              </Text>
            </TouchableOpacity>
            <View className="absolute right-[20px] inset-y-0 justify-center">
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#5b5b5c"
              />
            </View>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(home)/prefrences")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <Ionicons name="cog-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.accountSection.prefrencesButton")}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(home)/language")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="language-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.accountSection.langaugeButton")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            {t(
              "settingsPage.goalsAndTrackingSection.goalsAndTrackingHeaderText",
            )}
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Text className="text-base font-medium">Not Connected</Text>
              </View>
              <Ionicons name="heart-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.goalsAndTrackingSection.appleHealthButton")}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="information-circle-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.goalsAndTrackingSection.nutritionGoalsButton")}
              </Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(home)/(personal)/personal")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="flag-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t(
                  "settingsPage.goalsAndTrackingSection.goalsAndCurrentWeightButton",
                )}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="disc-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t(
                  "settingsPage.goalsAndTrackingSection.ringColorsExplanedButton",
                )}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(home)/reminders")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="notifications-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t(
                  "settingsPage.goalsAndTrackingSection.trackingRemindersButton",
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            {t("settingsPage.supportAndLegalSection.supportAndLegalHeaderText")}
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="mail-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.supportAndLegalSection.supportEmailButton")}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(legal)/terms")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <Ionicons name="document-text-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t(
                  "settingsPage.supportAndLegalSection.termsAndConditionsButton",
                )}
              </Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("/(legal)/privacypolicy")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="bag-check-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.supportAndLegalSection.privacyPolicyButton")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            {t("settingsPage.followMeSection.followMeHeaderText")}
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity
              onPress={() => router.push("https://github.com/itzdrixzz")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="logo-github" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Github</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="logo-discord" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Discord</Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity
              onPress={() => router.push("https://www.youtube.com/@DrixzzLabs")}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <Ionicons name="logo-youtube" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Youtube</Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            {t("settingsPage.accountActionsSection.accountActionsHeaderText")}
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity
              onPress={signOutAlert}
              className="flex-row items-center ml-[20px] my-[10px]"
            >
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="exit-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.accountActionsSection.logoutButton")}
              </Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="trash-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                {t("settingsPage.accountActionsSection.deleteAccountButton")}
              </Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
