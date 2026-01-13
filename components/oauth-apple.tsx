import { useSSO } from '@clerk/clerk-expo'
import { FontAwesome } from '@expo/vector-icons'
import * as AuthSession from 'expo-auth-session'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import React, { useCallback, useEffect } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'

type AppleButtonProps = {
  option: 'Sign-Up' | 'Sign-In';
};

// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

export default function AppleOauth({ option }: AppleButtonProps) {
  useWarmUpBrowser()

  const label = option === 'Sign-In' ? 'Sign in with Apple' : 'Sign up with Apple';

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_apple',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
          navigate: async ({ session }) => {
            router.push('/(home)/home')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View>
      <TouchableOpacity className="bg-[#000000] rounded-full mb-[5px] flex-row items-center border-[#000000] border-[2px]" onPress={onPress}>
        <View className="ml-[40px] mr-[40px]">
            <FontAwesome name='apple' size={35} color={"#ffffff"}/>
        </View>
        <Text className="py-[20px] pr-[90px] font-semibold text-[#ffffff]">{label}</Text>
      </TouchableOpacity>
    </View>
  )
}