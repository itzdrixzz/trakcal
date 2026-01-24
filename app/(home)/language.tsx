import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import i18n from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("SelectedLang");
      if (savedLanguage) {
        setSelected(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    setSelected(lang);
    await AsyncStorage.setItem("SelectedLang", lang);
    await AsyncStorage.setItem("lang", lang);
    await i18n.changeLanguage(lang);
  };

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
              {t("settingsPage.accountSection.languagePage.languageHeaderText")}
            </Text>
          </View>
          <View className="mt-[30px] mx-[20px]">
            <TouchableOpacity
              onPress={() => changeLanguage("en")}
              className=" py-[20px] flex-row"
            >
              <Text className="text-xl font-medium">🇺🇸 English</Text>
              {selected === "en" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("zh")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇨🇳 中國人</Text>
              {selected === "zh" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("ru")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇷🇺 Русский</Text>
              {selected === "ru" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("nl")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇳🇱 Nederlands</Text>
              {selected === "nl" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("fr")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇫🇷 Français</Text>
              {selected === "fr" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("es")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇪🇸 Español</Text>
              {selected === "es" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("it")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇮🇹 Italiano</Text>
              {selected === "it" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("pt")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇧🇷 Português</Text>
              {selected === "pt" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("sv")}
              className=" py-[20px]"
            >
              <Text className="text-xl font-medium">🇸🇪 svenska</Text>
              {selected === "sv" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] rounded-full" />
            <TouchableOpacity
              onPress={() => changeLanguage("hi")}
              className="py-[20px]"
            >
              <Text className="text-xl font-medium">🇮🇳 हिंदी</Text>
              {selected === "hi" && (
                <View className="absolute right-[20px] -inset-y-0 justify-center">
                  <Ionicons size={28} name="checkmark-circle" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Language;
