import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="bg-[#ffffff] flex-1">
      <ScrollView>
        <Text className="text-4xl font-bold mx-[20px] mt-[10px] mb-[20px]">
          Profile
        </Text>
        <TouchableOpacity onPress={() => router.push("/(home)/(tabs)/home")}>
          <View className="bg-[#ffffff] border-[1px] border-[#eaeced] flex-row mx-[20px] rounded-3xl">
            <Image
              source={{ uri: user?.imageUrl }}
              width={80}
              height={80}
              className="rounded-full m-[10px] ml-[20px]"
            ></Image>
            <View className="my-[10px] ml-[10px] justify-center">
              <Text className="text-lg font-bold">{user?.fullName}</Text>
              <Text className="text-md font-normal">@{user?.username}</Text>
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
          <Text className="text-lg font-semibold text-[#7b7b7c]">Account</Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="person-circle-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Personal Details</Text>
            </TouchableOpacity>
            <View className="absolute right-[20px] inset-y-0 justify-center">
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#5b5b5c"
              />
            </View>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="cog-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Prefrences</Text>
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
              <Ionicons name="language-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Language</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            Goals & Tracking
          </Text>
          <View className=" border-[1px] border-[#eaeced] mt-[10px] rounded-xl">
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Text className="text-base font-medium">Not Connected</Text>
              </View>
              <Ionicons name="heart-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Apple Health</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="information-circle-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Nutrition Goals</Text>
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
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
              <Ionicons name="flag-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                Goals & Current Weight
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
                Ring Colors Explaned
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
              <Ionicons name="notifications-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                Tracking Reminders
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            Support & Legal
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
              <Text className="pl-[10px] font-semibold">Support Email</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="document-text-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">
                Terms and Conditions
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
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <View className="absolute right-[20px] inset-y-0 justify-center">
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#5b5b5c"
                />
              </View>
              <Ionicons name="bag-check-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold text-[#7b7b7c] mt-[20px]">
            Follow Me
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
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
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
            Account Actions
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
              <Ionicons name="exit-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Logout</Text>
            </TouchableOpacity>
            <View className="h-[1px] bg-[#ededed] mx-[20px] rounded-full" />
            <TouchableOpacity className="flex-row items-center ml-[20px] my-[10px]">
              <Ionicons name="trash-outline" size={28}></Ionicons>
              <Text className="pl-[10px] font-semibold">Delete Account</Text>
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
