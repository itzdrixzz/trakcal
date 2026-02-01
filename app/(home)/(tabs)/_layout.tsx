import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TabLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Absolute overlay */}
      {open && (
        <Pressable
          onPress={() => setOpen(false)}
          className="absolute inset-0 z-50 bg-black/40"
        >
          <View className="absolute bottom-28 right-4 w-56 rounded-2xl bg-white p-4">
            <Text className="text-base font-semibold">Quick actions</Text>
            <Text className="mt-2">Log food</Text>
            <Text className="mt-2">Add meal</Text>
            <Text className="mt-2">Scan barcode</Text>
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
