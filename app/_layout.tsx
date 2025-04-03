import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "../global.css"

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='index'></Stack.Screen>
    </Stack>
  )
}