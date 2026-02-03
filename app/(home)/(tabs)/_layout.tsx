import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const [open, setOpen] = useState(false);

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
                <View className="bg-red-400 flex-1 items-center rounded-lg">
                  <TouchableOpacity className="items-center w-full">
                    <View className="bg-white rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="search" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Log Food
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="bg-blue-400 flex-1 items-center rounded-lg">
                  <TouchableOpacity
                    onPress={() => router.push("/(home)/(add_food)/barcode")}
                    className="items-center w-full"
                  >
                    <View className="bg-white rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="barcode" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Barcode Scan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className=" flex-row gap-6 ">
                <View className="bg-orange-400 flex-1 items-center rounded-lg">
                  <TouchableOpacity className="items-center w-full">
                    <View className="bg-white rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
                      <Ionicons name="scan" size={28} color="black" />
                    </View>
                    <Text className="text-center my-2 text-lg font-medium">
                      Meal Scan
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="bg-yellow-400 flex-1 items-center rounded-lg">
                  <TouchableOpacity className="items-center w-full">
                    <View className="bg-white rounded-full w-[40px] h-[40px] mt-4 justify-center items-center">
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
            tabBarIcon: ({ color }) => (
              <Ionicons name="cog-outline" size={28} color={color} />
            ),
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
                {/* circle */}
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
