import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const EmailSignUp = () => {

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/(onboarding)/onboarding')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <SafeAreaView>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
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
            <Text className="text-3xl ml-[30px] font-bold">Sign Up with Email Address</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <View className="">
              <TextInput className="bg-[#ffffff] py-[20px] w-[340px] mb-[10px] rounded-xl border-[1px] pl-[20px]"  placeholderTextColor="#c4c4c6" value={emailAddress} onChangeText={setEmailAddress} placeholder='Email'></TextInput>
              <TextInput className="bg-[#ffffff] py-[20px] w-[340px] mb-[30px] rounded-xl border-[1px] pl-[20px]" placeholderTextColor="#c4c4c6" value={password} onChangeText={setPassword} placeholder='Password'></TextInput>
              <TouchableOpacity className="bg-[#b1b1b1] py-[22px] rounded-full items-center"><Text className="text-[#ffffff] text-xl font-medium" onPress={onSignUpPress}>Continue</Text></TouchableOpacity>
              <Text className="mt-[5px] text-center text-lg">Already have a account? <Link className="font-bold" href={"/(auth)/email-sign-in"}>Sign In</Link></Text>
            </View>
          </View>
          <Text className="text-[#7d7d7d] text-center font-medium">By continuing you agree to Trakcal's {"\n"}<Link className="text-[#1f1d23]" href={"/(legal)/terms"}>Terms and Conditions</Link> and <Link className="text-[#1f1d23]" href={"/privacypolicy"}>Privacy Policy</Link></Text>
    </SafeAreaView>
  )
}

export default EmailSignUp