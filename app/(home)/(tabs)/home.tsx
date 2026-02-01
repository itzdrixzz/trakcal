import caloriePercent01 from "@/app/functions/toPercent01";
import getWeekRange from "@/app/functions/weekInfo";
import CircleProgress from "@/components/circleProgressBar";
import SmallCircleProgress from "@/components/smallCircleProgressBar";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

  const { startDate, endDate, days } = getWeekRange(0); // 0 = current week

  const dailyLogs = useQuery(
    api.functions.tracking.listByDateRange,
    user ? { userId: user.id, fromDate: startDate, toDate: endDate } : "skip",
  );

  const handleChange = (date: string) => {
    setSelectedDate(date);
    console.log("date:", date);
  };

  const logsByDate = useMemo(() => {
    const map = new Map<string, any>();
    dailyLogs?.forEach((log) => {
      map.set(log.date, log);
    });
    return map;
  }, [dailyLogs]);

  const log = selectedDate ? logsByDate.get(selectedDate) : undefined;

  const eaten = log?.calories ?? 0;
  const goal = convexUser?.calorieDeficit ?? 1;
  const progress = caloriePercent01(eaten, goal);

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-red-600 mt-[20px] flex-1">
        <Text className=" mx-[15px] text-4xl font-semibold">Trakcal</Text>

        <View className="bg-yellow-600 mt-[20px] mx-[15px] flex-row">
          {days.map((day) => {
            const logs = logsByDate.get(day.date);
            const d = new Date(day.date);
            const currentDay = d.getDate(); // already 1–31

            const eaten = logs?.calories ?? 0;
            const goal = convexUser?.calorieDeficit ?? 1;
            const progress = caloriePercent01(eaten, goal);

            return (
              <View key={day.date} className="flex-1 px-1">
                <TouchableOpacity onPress={() => handleChange(day.date)}>
                  <View className="bg-lime-400 rounded-xl h-[70px] items-center">
                    <Text className="text-lg font-medium">{day.label}</Text>
                    <View className="bg-orange-400 mt-1  rounded">
                      <SmallCircleProgress
                        progress={progress}
                        size={40}
                        text={String(currentDay)}
                        strokeWidth={4}
                        color="#181818"
                        trackColor="#eff0f5"
                        textColor="#181818"
                        containerClassName="bg-white rounded-full"
                        textClassName="tracking-tight"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View className="bg-blue-400 mx-[15px] mt-6 rounded-2xl">
          <View className="bg-green-300 m-4 flex-row">
            <View className="bg-cyan-400 my-4 ml-4 justify-center">
              <View className="bg-purple-600 flex-row">
                <Text className="text-5xl font-medium">
                  {log ? log.calories : "0"}
                </Text>
                <Text className="text-lg font-normal mt-auto mb-2">
                  /{convexUser?.calorieDeficit}
                </Text>
              </View>
              <Text className="text-sm font-medium text-[#eff0f5]">
                {" "}
                Calories Eaten
              </Text>
            </View>
            <View className="bg-yellow-400 my-4 ml-auto mr-6">
              <CircleProgress
                progress={progress}
                size={120}
                strokeWidth={12}
                color="#181818"
                trackColor="#eff0f5"
                textColor="#181818"
                containerClassName="bg-white rounded-full"
                textClassName="tracking-tight"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
