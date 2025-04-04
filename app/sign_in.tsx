import {
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { useAuth } from "@/services/auth/AuthContext";
import useDimensionsContext from "@/utils/theme/dimension_context";
import SignIn from "./(app)";

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

    function GooglSignInButton() {
        return (
            <TouchableOpacity
                className="flex-row justify-center items-center border-primary bg-black_1 border-[1px] rounded-2xl py-2"
                style={{width: screen.width * 0.9}}
                onPress={signIn}>
                <Image
                    source={require("@/assets/images/google-icon.png")}
                    className="size-8 object-scale-down mx-3"
                />
                <Text className="text-white text-[16px] font-semibold">Sign In with Google</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView className="h-full flex-col justify-center items-center">
            <Image
                source={require("@/assets/images/logo.png")}
                className="w-auto"
                style={{
                    height: screen.height * 0.5,
                    resizeMode: "contain",
                }}
            />
            <View>
            </View>
                <GooglSignInButton />
        </SafeAreaView>
    );
}
