import { Image } from "expo-image"
import { Link, router } from "expo-router"
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const welcomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#ffffff] items-center flex-1">
      <View className="mt-[50px]">
        <Image style={{ width: 200, height: 400 }} source={require("../../assets/images/template.png")}/>
      </View>
      <View className="mt-[70px]">
            <Text className="font-bold px-[40px] pt-[20px] pb-[25px] text-4xl">Calorie tracking{"\n"}     made easy</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text className="text-center text-2xl bg-[#000000] font-medium text-[#fffeff] rounded-full py-[15] px-[130px]">Get Started</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center text-lg pt-[10px]">Already have a account? <Link className="font-bold" href={"/(auth)/sign-in"}>Sign In</Link></Text>
    </SafeAreaView>
  )
}

export default welcomeScreen