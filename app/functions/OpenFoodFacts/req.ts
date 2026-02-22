import axios from "axios";

const getFoodFactsByBarcode = async (barcode: string) => {
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.net/api/v2/product/${barcode}`,
    );

    const body = response.data;
    const product = body.product;
    const nutriments = product.nutriments;
    const id = product._id;

    const name = product.product_name;
    const brand = product.brands;

    const servingSizeGrams = product.serving_quantity;
    const carbs = nutriments.carbohydrates_serving;
    const fat = nutriments.fat_serving;
    const protein = nutriments.proteins_serving;
    const calories = nutriments["energy-kcal_serving"];
    const sodium = nutriments.sodium_serving;
    const sugar = nutriments.sugars_serving;
    const fiber = nutriments.fiber_serving;

    return {
      name,
      brand,
      servingSizeGrams,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium,
      id,
    };
  } catch (error) {
    console.error("Error fetching food:", error);
    return null;
  }
};

export default getFoodFactsByBarcode;
