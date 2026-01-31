const getActivityMultiplier = (range: string) => {
  switch (range) {
    case "0-2":
      return 1.375;

    case "3-5":
      return 1.55;

    case "6+":
      return 1.725;

    default:
      return 1.375;
  }
};
export default getActivityMultiplier;
