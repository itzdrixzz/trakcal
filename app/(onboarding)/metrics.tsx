import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type metricsProps = {
  height: string;
  weight: string;
  age: string;
  onChange: (field: 'height' | 'weight' | 'age', value: string) => void;
  onNext: () => void;
  onBack: () => void;  
}

const Metrics: React.FC<metricsProps> = ({ height, weight, age, onChange, onNext, onBack}) => {

  return (
    <SafeAreaView className="flex-1">
        <View className="">
            <View className="flex-row items-center">
                <Pressable onPress={onBack}>
                    <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
                  </Pressable>
                  <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
                    <View className="h-[3px] bg-[#000000] w-[126px] rounded-full"/>
                  </View>
                </View>
                <Text className="text-3xl ml-[30px] font-bold">Height & weight</Text>
                <Text className="ml-[30px] mt-[5px] text-sm font-medium text-[#303030]">This will be used to calibrate your custom plan</Text>
              </View>
              <View className="flex-1 justify-center max-w-[400px] px-[10px]">
                <View className="mb-[15px]">
                  <Text className="font-bold text-lg">Age</Text>
                  <TextInput value={age} onChangeText={(value) => onChange('age', value)} className="bg-[#ffffff] py-[20px] w-full mb-[10px] rounded-xl border-[1px] pl-[20px] mr-[10px]"  placeholderTextColor="#c4c4c6" placeholder='19'></TextInput>
                </View>
                <View className="flex-row">
                  <Text className="font-bold text-lg mr-[140px]">Height</Text>
                  <Text className="font-bold text-lg">Weight</Text>
                </View>
                <View className="flex-row items-center justify-center">
                  <TextInput value={height} onChangeText={(value) => onChange('height', value)} className="bg-[#ffffff] py-[20px] w-[180px] mb-[10px] rounded-xl border-[1px] pl-[20px] mr-[10px]"  placeholderTextColor="#c4c4c6" placeholder='5&apos;11&quot;'></TextInput>
                  <TextInput value={weight} onChangeText={(value) => onChange('weight', value)} className="bg-[#ffffff] py-[20px] w-[180px] mb-[10px] rounded-xl border-[1px] pl-[20px]"  placeholderTextColor="#c4c4c6" placeholder='120'></TextInput>
                </View>
              </View>
              <View className="mb-[50px] mx-[25px]">
            <TouchableOpacity  className="py-[22px] rounded-full items-center bg-black"><Text className="text-[#ffffff] text-xl font-medium" onPress={onNext}>Continue</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Metrics