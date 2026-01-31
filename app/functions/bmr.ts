// heightCm: Number of cm your user is
// gender: the gender of your user
// weight: numbers of lbs your user is
// age: the age your user is

const CalculateBmr = (
  heightCm: number,
  gender: string,
  weight: number,
  age: number,
) => {
  const bmr =
    gender === "Male"
      ? 10 * (weight / 2.20462) + 6.25 * heightCm - 5 * age + 6
      : 10 * (weight / 2.2462) + 6.25 * heightCm - 5 * age - 161;

  return Math.round(bmr);
};

export default CalculateBmr;
