import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  // If clerk user signed in then redirect them to home page
  if (isSignedIn) {
    return <Redirect href={'/(onboarding)/onboarding'} />
  }

  // remove the browser looking thing from the top of the screen
  return <Stack screenOptions={{headerShown:false}} />
}