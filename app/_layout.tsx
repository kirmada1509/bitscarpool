import React from "react";
import { Slot } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/services/auth/AuthContext";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { DimensionsProvider } from "@/utils/theme/dimension_context";

export default function _layout() {
    return (
        <AuthProvider>
            <DimensionsProvider>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="default"
                />
                <Slot/>
            </DimensionsProvider>
        </AuthProvider>
    );
}
