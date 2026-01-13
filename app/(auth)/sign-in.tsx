import EmailSignInButton from '@/components/email-sign-in'
import AppleOauth from '@/components/oauth-apple'
import GoogleOauth from '@/components/oauth-google'
import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('../(home)/home')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <Ionicons className="pt-[10px] pl-[25px] mr-[5px]" size={25} name="arrow-back-outline"/>
          </Pressable>
          <View className="h-[3px] bg-[#000000] w-[300px] items-center mt-[10px] rounded-full"/>
        </View>
        <Text className="text-3xl ml-[30px] font-bold">Sign in to your account</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View>
          <AppleOauth option="Sign-In"/>
          <GoogleOauth option="Sign-In"/>
          <EmailSignInButton option="Sign-In"/>
          <Text className="mt-[5px] text-center text-lg">Already have a account? <Link className="font-bold" href={"/(auth)/sign-up"}>Sign Up</Link></Text>
        </View>
      </View>
      <Text className="text-[#7d7d7d] text-center font-medium">By continuing you agree to Trakcal's {"\n"}<Link className="text-[#1f1d23]" href={"/(legal)/terms"}>Terms and Conditions</Link> and <Link className="text-[#1f1d23]" href={"/privacypolicy"}>Privacy Policy</Link></Text>
    </SafeAreaView>
  )
}