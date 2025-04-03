import { View, Text } from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import google_sign_in from "@/services/auth/googe_sign_in";

export default function Index() {
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
            <Text>Index</Text>
            {/* <Text className="font-poppinsr">Index</Text> */}
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={async () => {
                    await google_sign_in();
                }}
            />
        </View>
    );
}
