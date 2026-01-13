import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmailSignUp = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
          </Pressable>
          <View className="h-[3px] bg-[#000000] w-[300px] items-center mt-[10px] rounded-full"/>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">Sign up with Email Address</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View>
          <TouchableOpacity><Text>1</Text></TouchableOpacity>
          <TouchableOpacity><Text>2</Text></TouchableOpacity>
          <TouchableOpacity><Text>3</Text></TouchableOpacity>
          <Text className="mt-[5px] text-center text-lg">Already have a account? <Link className="font-bold" href={"/(auth)/email-sign-in"}>Sign In</Link></Text>
        </View>
      </View>
      <Text className="text-[#7d7d7d] text-center font-medium">By continuing you agree to Trakcal's {"\n"}<Link className="text-[#1f1d23]" href={"/(legal)/terms"}>Terms and Conditions</Link> and <Link className="text-[#1f1d23]" href={"/privacypolicy"}>Privacy Policy</Link></Text>
    </SafeAreaView>
  )
}

export default EmailSignUp