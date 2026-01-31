import axios from "axios";
import { router } from "expo-router";
import CalculateBmi from "./bmi";
import CalculateBmr from "./bmr";
import calculateDeficitCalories from "./calculateDeficitCalories";
import getActivityMultiplier from "./getActivityMultiplier";
import AdjustGoalCalories from "./goal_calorie_adjustments";
import ConvertToMacros from "./splitmacros";
import CalculateTDEE from "./TDEE";

const OnboardingSubmit = async (
  addConvexUser: any,
  userId: string,
  age: number,
  desiredWeight: number,
  gender: string,
  goal: string,
  heightCm: number,
  lossPerWeek: number,
  weight: number,
  workoutsPerWeek: string,
  firstName: string,
  lastName: string,
  username: string,
  steps: number,
) => {
  const bmi = CalculateBmi(heightCm, weight);

  const bmr = CalculateBmr(heightCm, gender, weight, age);

  const multiplier = getActivityMultiplier(workoutsPerWeek);

  const tdee = CalculateTDEE(bmr, multiplier);

  const change = calculateDeficitCalories(lossPerWeek);
  const calorieAjustment = AdjustGoalCalories(tdee, change);

  const splitMacros = ConvertToMacros(calorieAjustment);

  await addConvexUser({
    userId: userId,
    age: age,
    desiredWeight: desiredWeight,
    gender: gender,
    goal: goal,
    heightCm: heightCm,
    lossPerWeek: lossPerWeek,
    weight: weight,
    workoutsPerWeek: workoutsPerWeek,
    firstName: firstName,
    lastName: lastName,
    username: username,
    steps: steps,
    bmi: bmi,
    bmr: bmr,
    tdee: tdee,
    calorieDeficit: calorieAjustment,
    protienGrams: splitMacros.Protein,
    fatGrams: splitMacros.Fat,
    carbsGrams: splitMacros.Carbs,
    fiberTarget: splitMacros.Fiber,
    sugarLimit: splitMacros.SugarLimit,
    sodiumLimit: splitMacros.Sodium,
  });

  try {
    const json = {
      id: userId,
    };
    const response = await axios.post(
      "https://aerological-cathleen-eximiously.ngrok-free.dev/clerk/update/metadata/completedonboarding",
      json,
      { headers: { "Content-Type": "application/json" } },
    );
    console.log("Response:", response.data);
    console.log("api sent");
    router.push("/(home)/(tabs)/home");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default OnboardingSubmit;
