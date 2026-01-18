import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type motivationProps = {
    goal: string;
    desiredWeight: string;
    onNext: () => void;
    onBack: () => void;
}

const Motivation: React.FC<motivationProps> = ({ goal, desiredWeight, onNext, onBack}) => {
  return (
    <SafeAreaView className="flex-1">
              <View>
                <View className="flex-row items-center">
                  <Pressable onPress={onBack}>
                    <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
                  </Pressable>
                  <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
                    <View className="h-[3px] bg-[#000000] w-[252px] rounded-full"/>
                  </View>
                </View>
              </View>
              <View className="flex-1 items-center justify-center">
                <View>
                  <Text className="text-4xl text-center font-extrabold mb-[15px]">{goal === "Lose Weight" ? "Losing" : goal === "Maintain Weight" ? "Maintaining" : "Gaining"} <Text className="text-[#de9a69]">{desiredWeight} lb</Text> is a realistic {"\n"}target. it's not hard at {"\n"}all!</Text>
                  <Text className="text-center text-lg font-semibold">90% of users say that the change is {"\n"}obvious after using Trakcal and it is not {"\n"}easy to rebound</Text>
                </View>
              </View>
              <View className="mb-[50px] mx-[25px]">
                  <TouchableOpacity onPress={onNext} className="py-[22px] rounded-full items-center bg-[#000000]"><Text className="text-[#ffffff] text-xl font-medium">Continue</Text></TouchableOpacity>
              </View>
        </SafeAreaView>
  )
}

export default Motivation