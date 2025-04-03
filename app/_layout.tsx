import React from 'react'
import { Slot } from 'expo-router'
import "../global.css"
import { AuthProvider } from '@/services/auth/AuthContext'

export default function _layout() {
  return (
    <AuthProvider>
      <Slot/>
    </AuthProvider>
  )
}