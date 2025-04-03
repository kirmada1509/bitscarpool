import { View, Text } from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import google_sign_in from "@/services/auth/googe_sign_in";
import { useAuth } from "@/services/auth/AuthContext";

export default function Index() {

    const {signIn} = useAuth();

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
        <View>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </View>
    );
}
