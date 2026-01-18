import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type GoalProps = {
    goal: string;
    goalOptions: ("Lose Weight" | "Maintain Weight" | "Gain Weight")[];
    onChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const Goal: React.FC<GoalProps> = ({ goal, goalOptions, onChange, onNext, onBack }) => {

  return (
<SafeAreaView className="flex-1">
    <View className="">
        <View className="flex-row items-center">
            <Pressable onPress={onBack}>
                <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
                  </Pressable>
                  <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
                    <View className="h-[3px] bg-[#000000] w-[168px] rounded-full"/>
                  </View>
                </View>
                <Text className="text-3xl ml-[30px] font-bold">What is your goal?</Text>
                <Text className="ml-[30px] mt-[5px] text-sm font-medium text-[#303030]">This will be used to calibrate your custom plan</Text>
              </View>
              <View className="flex-1 items-center justify-center">
                <View>
                  {goalOptions.map((option, Index) => (
                    <TouchableOpacity key={Index}  className={`py-[25px] w-[340px] mb-[10px] rounded-2xl items-center ${goal === option ? 'bg-[#000000]' : 'bg-[#f2f2f2]'}`} onPress={() => onChange(option)}>
                      <Text className={`${goal === option ? 'text-white' : 'text-black'} font-semibold`}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  
                </View>
              </View>
            <View className="mb-[50px] mx-[25px]">
        <TouchableOpacity disabled={!goal}  className={`py-[22px] rounded-full items-center ${goal ? 'bg-[#000000]' : 'bg-gray-300'}`}><Text className="text-[#ffffff] text-xl font-medium" onPress={onNext}>Continue</Text></TouchableOpacity>
    </View>
</SafeAreaView>
  )
}

export default Goal