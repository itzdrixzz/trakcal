import { SignOutButton } from '@/components/SignOutButton'
import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const home = () => {  
const {user} = useUser()

const Name = user?.firstName;
const userId = user?.id;

  return (
    <SafeAreaView>
      <Text>home</Text>
      <Text>{userId}</Text>
      <Text>hello {Name}</Text>
      <SignOutButton/>
    </SafeAreaView>
    
  )
}

export default home