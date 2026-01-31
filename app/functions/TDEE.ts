// bmr: (basic metabolic rate) your users bmr
// multiplier: the activity level mesured as a decimal

const CalculateTDEE = (bmr: number, multiplier: number) => {
  const TDEE = bmr * multiplier;
  return Math.round(TDEE);
};

export default CalculateTDEE;
