import caloriePercent01 from "@/app/functions/toPercent01";
import getWeekRange from "@/app/functions/weekInfo";
import CircleProgress from "@/components/circleProgressBar";
import GramsCircleProgress from "@/components/gramsCircleBar";
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

  // --- Auth redirect ---
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) router.replace("/(auth)/welcome-screen");
  }, [isLoaded, isSignedIn, user]);

  // --- Week range ---
  const { startDate, endDate, days } = getWeekRange(0); // 0 = current week

  // --- Queries ---
  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user.id } : "skip",
  );

  const dailyLogs = useQuery(
    api.functions.tracking.listByDateRange,
    user ? { userId: user.id, fromDate: startDate, toDate: endDate } : "skip",
  );

  // --- Index logs by date ---
  const logsByDate = useMemo(() => {
    const map = new Map<string, any>();
    for (const l of dailyLogs ?? []) map.set(l.date, l);
    return map;
  }, [dailyLogs]);

  useEffect(() => {
    if (selectedDate || !days.length) return;

    // today's local date in YYYY-MM-DD
    const today = new Date();
    const todayIso = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    // find today in the current week
    const todayInWeek = days.find((d) => d.date === todayIso);

    setSelectedDate(todayInWeek?.date ?? days[0].date);
  }, [days, selectedDate]);

  const handleChange = (date: string) => setSelectedDate(date);

  const log = selectedDate ? logsByDate.get(selectedDate) : undefined;

  // --- Local day number (no leading zero) ---
  const isoDay = (dateInput: string | Date) => {
    if (dateInput instanceof Date) return String(dateInput.getDate());

    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateInput);
    if (m) {
      const y = Number(m[1]);
      const mo = Number(m[2]) - 1;
      const d = Number(m[3]);
      return String(new Date(y, mo, d).getDate());
    }

    return String(new Date(dateInput).getDate());
  };

  // --- Safe numbers (removes tons of log ? ... : ... checks) ---
  const safeLog = {
    calories: log?.calories ?? 0,
    protienGrams: log?.protienGrams ?? 0,
    carbsGrams: log?.carbsGrams ?? 0,
    fatGrams: log?.fatGrams ?? 0,
  };

  const goals = {
    calories: convexUser?.calorieDeficit ?? 1,
    protein: convexUser?.protienGrams ?? 1,
    carbs: convexUser?.carbsGrams ?? 1,
    fat: convexUser?.fatGrams ?? 1,
  };

  const pct = (eaten: number, goal: number) =>
    caloriePercent01(eaten, goal || 1);

  const progress = {
    calories: pct(safeLog.calories, goals.calories),
    protein: pct(safeLog.protienGrams, goals.protein),
    carbs: pct(safeLog.carbsGrams, goals.carbs),
    fat: pct(safeLog.fatGrams, goals.fat),
  };

  const macros = [
    {
      key: "protein",
      title: "Protien Eaten",
      eaten: safeLog.protienGrams,
      goal: goals.protein,
      prog: progress.protein,
    },
    {
      key: "carbs",
      title: "Carbs Eaten",
      eaten: safeLog.carbsGrams,
      goal: goals.carbs,
      prog: progress.carbs,
    },
    {
      key: "fat",
      title: "Fat Eaten",
      eaten: safeLog.fatGrams,
      goal: goals.fat,
      prog: progress.fat,
    },
  ] as const;

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <View className="mt-[20px] flex-1">
        <Text className="mx-[15px] text-4xl font-semibold">Trakcal</Text>

        {/* Week day buttons */}
        <View className="bg-[#ffffff] mt-[20px] mx-[15px] flex-row">
          {days.map((day) => {
            const logForDay = logsByDate.get(day.date);

            const eaten = logForDay?.calories ?? 0;
            const goal = goals.calories;
            const progressForDay = pct(eaten, goal);

            const currentDay = isoDay(day.date);

            const isSelected = selectedDate === day.date;

            return (
              <View key={day.date} className="flex-1 px-1">
                <TouchableOpacity onPress={() => handleChange(day.date)}>
                  <View
                    className={[
                      "bg-[#ffffff] border-[1px] rounded-xl h-[70px] items-center",
                      isSelected ? "border-[#181818]" : "border-[#eaeced]",
                    ].join(" ")}
                  >
                    <Text className="text-lg font-medium">{day.label}</Text>
                    <SmallCircleProgress
                      progress={progressForDay}
                      size={40}
                      text={currentDay}
                      strokeWidth={4}
                      color="#181818"
                      trackColor="#eff0f5"
                      textColor="#181818"
                      containerClassName="bg-white rounded-full"
                      textClassName="tracking-tight"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View className="bg-[#ffffff]">
          {/* Calories card */}
          <View className="bg-[#ffffff] border-[1px] border-[#eaeced] mx-[15px] mt-6 rounded-2xl">
            <View className="m-4 flex-row">
              <View className="my-4 ml-4 justify-center">
                <View className="flex-row">
                  <Text
                    className={`text-5xl ${safeLog.calories < goals.calories ? "text-[#181818]" : "text-[#DA1E28]"} font-medium`}
                  >
                    {safeLog.calories}
                  </Text>
                  <Text className="text-lg font-normal mt-auto mb-2">
                    /{goals.calories}
                  </Text>
                </View>
                <Text className="text-sm font-medium"> Calories Eaten</Text>
              </View>

              <View className="my-4 ml-auto mr-6">
                <CircleProgress
                  progress={progress.calories}
                  size={120}
                  strokeWidth={12}
                  color={
                    safeLog.calories < goals.calories ? "#181818" : "#DA1E28"
                  }
                  trackColor="#eff0f5"
                  textColor="#181818"
                  containerClassName="bg-white rounded-full"
                  textClassName="tracking-tight"
                />
              </View>
            </View>
          </View>

          {/* Macro cards (mapped) */}
          <View className="flex-row mx-[20px] gap-[5px] justify-center mt-4">
            {macros.map((m) => (
              <View
                key={m.key}
                className="bg-[#ffffff] border-[1px] border-[#eaeced] w-1/3 rounded-lg"
              >
                <View className="flex-row items-center pl-2">
                  <Text
                    className={`text-3xl font-medium ${m.eaten < m.goal ? "text-[#181818]" : "text-[#DA1E28]"}`}
                  >
                    {m.eaten}
                  </Text>
                  <Text className="mt-auto mb-[5px]">/{m.goal}</Text>
                </View>

                <Text className="mx-2 text-sm font-normal">{m.title}</Text>

                <View className="justify-center items-center py-2">
                  <GramsCircleProgress
                    progress={m.prog}
                    size={100}
                    text={m.key}
                    strokeWidth={8}
                    color={m.prog < 1.0 ? "#181818" : "#DA1E28"}
                    trackColor="#eff0f5"
                    textColor="#181818"
                    containerClassName="bg-white rounded-full"
                    textClassName="tracking-tight"
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Recently Uploaded */}
          <View className=" mt-8">
            <Text className="mx-[15px] text-3xl font-semibold">
              Recently Uploaded
            </Text>
            <TouchableOpacity>
              <View className=" mt-4 mx-[15px] rounded-lg border-[1px] border-[#eaeced]">
                <Text className="my-10 text-center">
                  Tap + to add your first meal of the day
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
