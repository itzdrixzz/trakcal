//calorieAjustment: the users calorie ajustment

const ConvertToMacros = (calorieAjustment: number) => {
  const ProteinPercentNumber = calorieAjustment * (30 / 100);
  console.log("ConvertToMacros - ProteinPercentNumber:", ProteinPercentNumber);
  const FatPercentNumber = calorieAjustment * (25 / 100);
  console.log("ConvertToMacros - FatPercentNumber:", FatPercentNumber);
  const CarbsPercentNumber = calorieAjustment * (45 / 100);
  console.log("ConvertToMacros - CarbsPercentNumber:", CarbsPercentNumber);
  const ProteinPercentToGram = ProteinPercentNumber / 4;
  console.log("ConvertToMacros - ProteinPercentToGram:", ProteinPercentToGram);
  const FatPercentToGram = FatPercentNumber / 9;
  console.log("ConvertToMacros - FatPercentToGram:", FatPercentToGram);
  const CarbsPercentToGram = CarbsPercentNumber / 4;
  console.log("ConvertToMacros - CarbsPercentToGram:", CarbsPercentToGram);
  const FiberTarget = (calorieAjustment * 14) / 1000;
  console.log("ConvertToMacros - FiberTarget:", FiberTarget);
  const SugarLimit = (calorieAjustment * (10 / 100)) / 4;
  console.log("ConvertToMacros - SugarLimit:", SugarLimit);
  const SodiumLimit = 2300;
  console.log("ConvertToMacros - SodiumLimit:", SodiumLimit);
  return {
    Protein: Math.round(ProteinPercentToGram),
    Fat: Math.round(FatPercentToGram),
    Carbs: Math.round(CarbsPercentToGram),
    Fiber: Math.round(FiberTarget),
    SugarLimit: Math.round(SugarLimit),
    Sodium: SodiumLimit,
  };
};

export default ConvertToMacros;
