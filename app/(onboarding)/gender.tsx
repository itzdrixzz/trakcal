import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type GenderProps = {
  gender: string;                     // current selected gender
  genderOption: ("Male" | "Female" | "Other")[]; // options to choose from
  onChange: (value: string) => void;   // <-- add this
  onNext: () => void;                 // function to go to next step
}

const Gender: React.FC<GenderProps> = ({ gender, genderOption, onChange, onNext }) => {
  return (
    <SafeAreaView className="flex-1">
              <View className="">
                <View className="flex-row items-center">
                  <Pressable>
                    <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
                  </Pressable>
                  <View className="h-[3px] bg-[#e8e8e8] w-[300px] mt-[10px] rounded-full">
                    <View className="h-[3px] bg-[#000000] w-[42px] rounded-full"/>
                  </View>
                </View>
                <Text className="text-3xl ml-[30px] font-bold">Choose your Gender</Text>
                <Text className="ml-[30px] mt-[5px] text-sm font-medium text-[#303030]">This will be used to calibrate your custom plan</Text>
              </View>
              <View className="flex-1 items-center justify-center">
                <View>
                  {genderOption.map((option, Index) => (
                    <TouchableOpacity key={Index}  className={`py-[25px] w-[340px] mb-[10px] rounded-2xl items-center ${gender === option ? 'bg-[#000000]' : 'bg-[#f2f2f2]'}`} onPress={() => onChange(option)}>
                      <Text className={`${gender === option ? 'text-white' : 'text-black'} font-semibold`}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  
                </View>
              </View>
              <View className="mb-[50px] mx-[25px]">
                  <TouchableOpacity disabled={!gender} onPress={onNext}  className={`py-[22px] rounded-full items-center ${gender ? 'bg-[#000000]' : 'bg-gray-300'}`}><Text className="text-[#ffffff] text-xl font-medium">Continue</Text></TouchableOpacity>
              </View>
        </SafeAreaView>
  )
}

export default Gender;