import getFoodFactsByBarcode from "@/app/functions/OpenFoodFacts/req";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BarcodeMenu from "./(barcode)/barcodeMenu";

type food = {
  name: string;
  brand: string;
  servingSizeGrams: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  sugar: number;
  fiber: number;
  sodium: number;
};

const BarcodeScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [step, setStep] = useState(0);
  const [torchOn, setTorchOn] = useState(false);

  const [form, setForm] = useState<food>({
    name: "",
    brand: "",
    servingSizeGrams: 0,
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0,
    sugar: 0,
    fiber: 0,
    sodium: 0,
  });

  const next = () => setStep((s) => Math.min(s + 1, 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission, requestPermission]);

  if (step === 0) {
    if (!permission) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text> Requesting camera permissions</Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-center mb-4">
            Camera permissions are requiered
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-black px-4 py-3 rounded-xl"
          >
            <Text>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-black">
        <CameraView
          style={{ flex: 1 }}
          enableTorch={torchOn}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128", "qr"],
          }}
          onBarcodeScanned={async ({ data }) => {
            if (scanned) return;
            setScanned(true);
            const food = await getFoodFactsByBarcode(data);
            console.log(food);

            if (!food) {
              //maybe add error sometime later
              return;
            }

            const newForm = {
              name: food.name,
              brand: food.brand,
              servingSizeGrams: food.servingSizeGrams,
              calories: food.calories,
              carbs: food.carbs,
              fat: food.fat,
              protein: food.protein,
              sugar: food.sugar,
              fiber: food.fiber,
              sodium: food.sodium,
            };

            setForm(newForm);
            next();
          }}
        />

        <View className="absolute top-16 left-5">
          <TouchableOpacity onPress={() => router.back()}>
            <View className="w-[40px] h-[40px] bg-white items-center justify-center rounded-full">
              <Ionicons name="arrow-back" size={28} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="absolute top-16 right-5">
          <TouchableOpacity onPress={() => setTorchOn((v) => !v)}>
            <View className="w-[40px] h-[40px] bg-white items-center justify-center rounded-full">
              <Ionicons
                name={torchOn ? "flash-off" : "flash"}
                size={28}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-6 left-4 right-4 bg-black/70 rounded-2xl p-4">
          <Text className="text-white font-semibold text-base">
            Scan a barcode
          </Text>
          <Text className="text-white/80 mt-1">
            Hold the barcode inside the camera view.
          </Text>

          {scanned && (
            <TouchableOpacity
              onPress={() => setScanned(false)}
              className="mt-3 bg-white rounded-xl py-3 items-center"
            >
              <Text className="font-semibold">Tap to scan again</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  if (step === 1) {
    return (
      <BarcodeMenu
        servingSizeGrams={form.servingSizeGrams}
        calories={form.calories}
        carbs={form.carbs}
        fat={form.fat}
        protein={form.protein}
        sugar={form.sugar}
        fiber={form.fiber}
        sodium={form.sodium}
        name={`${form.name}`}
        brand={`${form.brand}`}
        onBack={() => back()}
      />
    );
  }
};

export default BarcodeScannerScreen;
