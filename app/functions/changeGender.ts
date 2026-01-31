import CalculateBmr from "./bmr";
import calculateDeficitCalories from "./calculateDeficitCalories";
import getActivityMultiplier from "./getActivityMultiplier";
import AdjustGoalCalories from "./goal_calorie_adjustments";
import ConvertToMacros from "./splitmacros";
import CalculateTDEE from "./TDEE";

const changeGenderSubmit = async (
  changeGender: any,
  userId: string,
  age: number,
  heightCm: number,
  weight: number,
  gender: string,
  workoutsPerWeek: string,
  lossPerWeek: number,
) => {
  const bmr = CalculateBmr(heightCm, gender, weight, age);
  const multiplier = getActivityMultiplier(workoutsPerWeek);
  const TDEE = CalculateTDEE(bmr, multiplier);
  const change = calculateDeficitCalories(lossPerWeek);
  const calorieAdjustment = AdjustGoalCalories(TDEE, change);
  const splitMacros = ConvertToMacros(calorieAdjustment);

  await changeGender({
    userId: userId,
    gender: gender,
    bmr: bmr,
    tdee: TDEE,
    calorieDeficit: calorieAdjustment,
    protienGrams: splitMacros.Protein,
    fatGrams: splitMacros.Fat,
    carbsGrams: splitMacros.Carbs,
    fiberTarget: splitMacros.Fiber,
    sugarLimit: splitMacros.SugarLimit,
    sodiumLimit: splitMacros.Sodium,
  });
};
export default changeGenderSubmit;
