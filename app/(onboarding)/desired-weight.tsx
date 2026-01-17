import { Ionicons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Desired = () => {
const [value, setValue] = useState(150)

  return (
    <SafeAreaView className="flex-1">
    <View className="">
        <View className="flex-row items-center">
            <Pressable onPress={() => router.back()}>
                <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
                  </Pressable>
                  <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
                    <View className="h-[3px] bg-[#000000] w-[210px] rounded-full"/>
                  </View>
                </View>
                <Text className="text-3xl ml-[30px] font-bold">What is your{"\n"}desired weight?</Text>
                <Text className="ml-[30px] mt-[5px] text-sm font-medium text-[#303030]">This will be used to calibrate your custom plan</Text>
              </View>
              <View className="flex-1 items-center justify-center">
                <View className="w-full justify-center items-center">
                  <Text className="text-lg font-medium mb-[10px]">Lose Weight</Text>  
                  <Text className="text-5xl font-bold mb-[20px]">{value} LB</Text>
                  <View className="w-full px-[25px]">
                    <Slider minimumValue={1} maximumValue={300} step={1} value={value} onValueChange={setValue} minimumTrackTintColor="#000000" maximumTrackTintColor="#dddddd" thumbTintColor="#ffffff"/>
                  </View>
                </View>
              </View>
              <View className="mb-[50px] mx-[25px]">
            <TouchableOpacity className="py-[22px] rounded-full items-center bg-[#000000]"><Text className="text-[#ffffff] text-xl font-medium" onPress={() => (router.push('/(onboarding)/motivation'))}>Continue</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Desired