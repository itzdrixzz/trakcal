import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const uriToBase64 = async (uri: string) => {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

const MealCameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [step, setStep] = useState(0);
  const [torchOn, setTorchOn] = useState(false);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission, requestPermission]);

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });

      if (!photo?.uri) return;

      setPhotoUri(photo.uri);
      next();
    } catch (e) {
      console.log("takePhoto error:", e);
    }
  };

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
            <Text className="text-white">Grant Permission</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-black">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          enableTorch={torchOn}
          facing="back"
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

        {/* shutter button */}
        <View className="absolute bottom-28 left-0 right-0 items-center">
          <TouchableOpacity onPress={takePhoto} activeOpacity={0.8}>
            <View className="w-[78px] h-[78px] rounded-full bg-white items-center justify-center">
              <View className="w-[64px] h-[64px] rounded-full bg-black/80" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-6 left-4 right-4 bg-black/70 rounded-2xl p-4">
          <Text className="text-white font-semibold text-base">
            Take a meal photo
          </Text>
          <Text className="text-white/80 mt-1">
            Hold your plate in view, then tap the button.
          </Text>
        </View>
      </View>
    );
  }

  if (step === 1) {
    return (
      <View className="flex-1 bg-black">
        {photoUri ? (
          <Image source={{ uri: photoUri }} className="flex-1" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white">No photo captured</Text>
          </View>
        )}

        <View className="absolute top-16 left-5">
          <TouchableOpacity
            onPress={() => {
              setPhotoUri(null);
              back();
            }}
          >
            <View className="w-[40px] h-[40px] bg-white items-center justify-center rounded-full">
              <Ionicons name="arrow-back" size={28} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-6 left-4 right-4 bg-black/70 rounded-2xl p-4 flex-row gap-3">
          <TouchableOpacity
            onPress={() => {
              setPhotoUri(null);
              setStep(0);
            }}
            className="flex-1 bg-white/20 rounded-xl py-3 items-center"
          >
            <Text className="text-white font-semibold">Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              if (!photoUri) return;

              const base64 = await uriToBase64(photoUri);

              router.back();
            }}
            className="flex-1 bg-white rounded-xl py-3 items-center"
          >
            <Text className="text-black font-semibold">Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

export default MealCameraScreen;
