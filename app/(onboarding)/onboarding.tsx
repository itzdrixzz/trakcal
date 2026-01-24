import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useMutation } from "convex/react";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";
import Desired from "./desired-weight";
import Fast from "./fast";
import Gender from "./gender";
import Goal from "./goal";
import Metrics from "./metrics";
import Motivation from "./motivation";
import Workouts from "./workouts";

type publicMetadata = {
  hasCompletedOnboarding?: boolean;
};

const Onboarding = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [step, setStep] = useState(0);
  const addConvexUser = useMutation(api.functions.user.addUser);

  const [form, setForm] = useState({
    desiredWeight: 150,
    weightLosePerWeek: "",
    gender: "",
    goal: "",
    fast: 1.5,
    workouts: "",
    metrics: {
      height: "",
      weight: 0,
      age: "",
    },
  });

  const workoutOptions: ("0-2" | "3-5" | "6+")[] = ["0-2", "3-5", "6+"];
  const goalOptions: ("Lose Weight" | "Maintain Weight" | "Gain Weight")[] = [
    "Lose Weight",
    "Maintain Weight",
    "Gain Weight",
  ];
  const GenderOptions: ("Male" | "Female" | "Other")[] = [
    "Male",
    "Female",
    "Other",
  ];

  const next = () => setStep((s) => Math.min(s + 1, 6));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  React.useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      router.replace("/(auth)/welcome-screen");
      return;
    }

    if (user?.publicMetadata?.hasCompletedOnboarding) {
      router.replace("/(home)/(tabs)/home");
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn || !user) return <Redirect href="/welcome-screen" />;

  const Submit = async () => {
    const heightInches = Number(form.metrics.height) / 2.54;
    const bmi = (form.metrics.weight / heightInches ** 2) * 703;
    const bmr =
      form.gender === "male"
        ? 10 * (form.metrics.weight / 2.205) +
          6.25 * Number(form.metrics.height) -
          5 * Number(form.metrics.age) +
          5
        : 10 * (form.metrics.weight / 2.205) +
          6.25 * Number(form.metrics.height) -
          5 * Number(form.metrics.age) -
          161;

    await addConvexUser({
      userId: user.id,
      age: Number(form.metrics.age),
      desiredWeight: Number(form.desiredWeight),
      gender: form.gender,
      goal: form.goal,
      heightCm: Number(form.metrics.height),
      lossPerWeek: Number(form.fast),
      weight: Number(form.metrics.weight),
      workoutsPerWeek: form.workouts,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      username: user.username ?? "",
      steps: 10000,
      bmi: bmi,
      bmr: bmr,
    });

    console.log("User added to convex database succsesfully");

    try {
      const json = {
        id: user.id,
      };

      const response = await axios.post(
        "https://aerological-cathleen-eximiously.ngrok-free.dev/clerk/update/metadata/completedonboarding",
        json,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Response:", response.data);
      console.log("api sent");
      router.push("/(home)/(tabs)/home");
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <>
      {step === 0 && (
        <Gender
          gender={form.gender}
          genderOption={GenderOptions as ("Male" | "Female" | "Other")[]}
          onChange={(value) => setForm({ ...form, gender: value })}
          onNext={next}
        />
      )}

      {step === 1 && (
        <Workouts
          workouts={form.workouts}
          workoutOptions={workoutOptions as ("0-2" | "3-5" | "6+")[]}
          onChange={(value) => setForm({ ...form, workouts: value })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 2 && (
        <Metrics
          height={form.metrics.height}
          weight={form.metrics.weight}
          age={form.metrics.age}
          onChange={(field, value) => {
            setForm({ ...form, metrics: { ...form.metrics, [field]: value } });
          }}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Goal
          goal={form.goal}
          goalOptions={
            goalOptions as ("Lose Weight" | "Maintain Weight" | "Gain Weight")[]
          }
          onChange={(value) => setForm({ ...form, goal: value })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <Desired
          desiredWeight={form.desiredWeight}
          goal={form.goal}
          onChange={(value) => setForm({ ...form, desiredWeight: value })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 5 && (
        <Motivation
          goal={form.goal}
          desiredWeight={form.desiredWeight}
          weight={form.metrics.weight}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 6 && (
        <Fast
          goal={form.goal}
          fast={form.fast}
          onChange={(value) => setForm({ ...form, fast: value })}
          onNext={Submit}
          onBack={back}
        />
      )}
    </>
  );
};

export default Onboarding;
