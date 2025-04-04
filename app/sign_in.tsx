import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

import { useAuth } from "@/services/auth/AuthContext";
import useDimensionsContext from "@/utils/theme/dimension_context";
import TermsAndConditions from "@/components/sign_in/terms_and_conditions";
import GooglSignInButton from "@/components/sign_in/googleSingInButton";

export default function Index() {
    const { signIn } = useAuth();
    const screen = useDimensionsContext();
    const [fontsLoaded] = useFonts({
        Poppins: Poppins_400Regular,
        PoppinsBold: Poppins_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <View className="h-full flex-col justify-center items-center">
            <Image
                source={require("@/assets/images/logo.png")}
                className="w-auto"
                style={{
                    height: screen.height * 0.5,
                    resizeMode: "contain",
                }}
            />
            <View className="my-10">
                <GooglSignInButton signIn={signIn} />
                <TermsAndConditions/>
            </View>
        </View>
    );
}
