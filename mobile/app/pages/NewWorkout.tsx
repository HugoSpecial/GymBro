import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const NewWorkout = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg font-semibold mb-4">New Workout</Text>
    </SafeAreaView>
  )
}

export default NewWorkout