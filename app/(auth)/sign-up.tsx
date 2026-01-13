import EmailSignUpButton from '@/components/email-sign-up'
import AppleOauth from '@/components/oauth-apple'
import GoogleOauth from '@/components/oauth-google'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import * as React from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUpScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
          </Pressable>
          <View className="h-[3px] bg-[#000000] w-[300px] items-center mt-[10px] rounded-full"/>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">Let's get you started</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View>
          <AppleOauth option="Sign-Up"/>
          <GoogleOauth option="Sign-Up"/>
          <EmailSignUpButton option='Sign-Up'/>
          <Text className="mt-[5px] text-center text-lg">Already have a account? <Link className="font-bold" href={"/(auth)/sign-in"}>Sign In</Link></Text>
        </View>
      </View>
      <Text className="text-[#7d7d7d] text-center font-medium">By continuing you agree to Trakcal's {"\n"}<Link className="text-[#1f1d23]" href={"/(legal)/terms"}>Terms and Conditions</Link> and <Link className="text-[#1f1d23]" href={"/privacypolicy"}>Privacy Policy</Link></Text>
    </SafeAreaView>
  )
}