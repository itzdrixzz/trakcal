const caloriePercent01 = (eaten: number, goal: number) => {
  if (goal <= 0) return 0;
  return Math.min(1, Math.max(0, eaten / goal));
};

export default caloriePercent01;
