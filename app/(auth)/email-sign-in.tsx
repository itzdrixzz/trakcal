import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmailSignIn = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
          </Pressable>
          <View className="h-[3px] bg-[#000000] w-[300px] items-center mt-[10px] rounded-full"/>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">Sign In with Email Address</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="">
          <TextInput className="bg-[#ffffff] py-[20px] w-[340px] mb-[10px] rounded-xl border-[1px] pl-[20px]"  placeholderTextColor="#c4c4c6" placeholder='Email'></TextInput>
          <TextInput className="bg-[#ffffff] py-[20px] w-[340px] mb-[30px] rounded-xl border-[1px] pl-[20px]" placeholderTextColor="#c4c4c6" placeholder='Password'></TextInput>
          <TouchableOpacity className="bg-[#b1b1b1] py-[22px] rounded-full items-center"><Text className="text-[#ffffff] text-xl font-medium">Continue</Text></TouchableOpacity>
          <Text className="mt-[5px] text-center text-lg">Dont have a account yet? <Link className="font-bold" href={"/(auth)/email-sign-up"}>Sign Up</Link></Text>
        </View>
      </View>
      <Text className="text-[#7d7d7d] text-center font-medium">By continuing you agree to Trakcal's {"\n"}<Link className="text-[#1f1d23]" href={"/(legal)/terms"}>Terms and Conditions</Link> and <Link className="text-[#1f1d23]" href={"/privacypolicy"}>Privacy Policy</Link></Text>
    </SafeAreaView>
  )
}

export default EmailSignIn