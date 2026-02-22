import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      {open && (
        <Pressable
          onPress={() => setOpen(false)}
          className="absolute inset-0 z-50 bg-black/40"
        >
          <View className="absolute bottom-28 inset-x-4 rounded-2xl p-4">
            <View className="gap-4">
              <View className=" flex-row gap-6">
                <View className="bg-white flex-1 items-center rounded-lg">
                  <TouchableOpacity className="items-center w-full">
                    <View className="bg-white border-[1px] rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="search" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Log Food
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="bg-white flex-1 items-center rounded-lg">
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/(home)/(add_food)/barcode");
                      setOpen(false);
                    }}
                    className="items-center w-full"
                  >
                    <View className="bg-white border-[1px] rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="barcode" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Barcode Scan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className=" flex-row gap-6 ">
                <View className="bg-white flex-1 items-center rounded-lg">
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/(home)/(add_food)/meal_scan");
                      setOpen(false);
                    }}
                    className="items-center w-full"
                  >
                    <View className="bg-white border-[1px] rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="scan" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Meal Scan
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="bg-white flex-1 items-center rounded-lg">
                  <TouchableOpacity className="items-center w-full">
                    <View className="bg-white border-[1px] rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="bookmark" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Saved Meals
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      )}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1e1a24",
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingBottom: 30,
            paddingTop: 15,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ size }) =>
              user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                  }}
                />
              ) : null,
          }}
        />

        <Tabs.Screen
          name="quick"
          options={{
            title: "",
            tabBarLabel: () => null,
            tabBarButton: () => (
              <Pressable
                onPress={() => setOpen((v) => !v)}
                className="flex-1 h-full items-center justify-center"
              >
                <View className="h-16 w-16 rounded-full bg-[#1e1a24] items-center justify-center ml-[-10px]">
                  <Ionicons name="add-outline" size={26} color="white" />
                </View>
              </Pressable>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
