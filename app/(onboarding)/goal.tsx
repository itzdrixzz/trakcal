import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Redirect, router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Goal = () => {

    const { isSignedIn, user, isLoaded } = useUser();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // Example options
  const options = ['Lose Weight', 'Maintain', 'Gain Weight'];

  React.useEffect(() => {
    if (user) {
      user.reload();
    }
  }, [user]);

  if (!isSignedIn || !user) return <Redirect href="/welcome-screen" />;

  if (user.publicMetadata.hasCompletedOnboarding){
    router.replace('/(home)/home')
  }

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
<SafeAreaView className="flex-1">
    <View className="">
        <View className="flex-row items-center">
            <Pressable onPress={() => router.back()}>
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
                  {options.map((option, Index) => (
                    <TouchableOpacity key={Index}  className={`py-[25px] w-[340px] mb-[10px] rounded-2xl items-center ${selectedOption === option ? 'bg-[#000000]' : 'bg-[#f2f2f2]'}`} onPress={() => setSelectedOption(option)}>
                      <Text className={`${selectedOption === option ? 'text-white' : 'text-black'} font-semibold`}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  
                </View>
              </View>
              <View className="mb-[50px] mx-[25px]">
            <TouchableOpacity disabled={!selectedOption}  className={`py-[22px] rounded-full items-center ${selectedOption ? 'bg-[#000000]' : 'bg-gray-300'}`}><Text className="text-[#ffffff] text-xl font-medium" onPress={() => (router.push('/(onboarding)/desired-weight'))}>Continue</Text></TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Goal