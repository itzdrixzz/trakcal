import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type EmailButtonProps = {
  option: 'Sign-Up' | 'Sign-In';
};

export default function EmailSignInButton({ option }: EmailButtonProps,) {
  
  const label = option === 'Sign-In' ? 'Continue with Email' : 'Continue with Email';


  return (
    <View className="mb-[5px]">
      <TouchableOpacity onPress={() => router.push("/(auth)/email-sign-in")} className="bg-[#ffffff] rounded-full flex-row items-center justify-center border-[#000000] border-[2px]">
        <Text className="py-[20px] font-semibold text-center">{label}</Text>
      </TouchableOpacity>
    </View>
  )

}