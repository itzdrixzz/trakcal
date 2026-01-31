//calorieAjustment: the users calorie ajustment

const ConvertToMacros = (calorieAjustment: number) => {
  const ProteinPercentNumber = calorieAjustment * (30 / 100);
  const FatPercentNumber = calorieAjustment * (25 / 100);
  const CarbsPercentNumber = calorieAjustment * (45 / 100);

  const ProteinPercentToGram = ProteinPercentNumber / 4;
  const FatPercentToGram = FatPercentNumber / 9;
  const CarbsPercentToGram = CarbsPercentNumber / 4;

  const FiberTarget = (calorieAjustment * 14) / 1000;
  const SugarLimit = (calorieAjustment * (10 / 100)) / 4;

  const SodiumLimit = 2300;

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
