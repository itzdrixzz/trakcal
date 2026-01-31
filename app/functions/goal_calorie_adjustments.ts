//TDEE: (Total Daily Energy Exoenditures) your users TDEE
//change: the number of calories +- to create a deficit or surplus

const AdjustGoalCalories = (TDEE: number, change: number) => {
  const Calories = TDEE - change;
  return Math.round(Calories);
};

export default AdjustGoalCalories;
