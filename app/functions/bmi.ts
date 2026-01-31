// heightCm: Number of cm your user is
// weight: numbers of lbs your user is

const CalculateBmi = (heightCm: number, weight: number) => {
  const heightInches = heightCm / 2.54;
  return Math.round((weight / heightInches ** 2) * 703);
};

export default CalculateBmi;
