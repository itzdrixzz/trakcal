const calculateDeficitCalories = (lossPerWeek: number) => {
  switch (lossPerWeek) {
    case 0.5:
      return 250;

    case 1:
      return 500;

    case 1.5:
      return 750;

    case 2:
      return 1000;

    case 2.5:
      return 1250;

    default:
      return 750;
  }
};

export default calculateDeficitCalories;
