import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
    GoogleSignin,
    GoogleSigninButton,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";

export default function Index() {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "754183958941-tjj80vho6q6misdv4mpmmu99mg4a8ji2.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        });
    }, []);

    const [state, setState] = useState<any>();
    const [isInProgress, setIsInProgress] = useState(false);

    const signIn = async () => {
        try {
            console.log("Checking Google Play Services...");
            await GoogleSignin.hasPlayServices();

            console.log("Starting Google Sign-In...");
            const response = await GoogleSignin.signIn();
            console.log("Sign-In Response:", response);

            if (isSuccessResponse(response)) {
                console.log("Sign-In Successful! User Info:", response.data);
                setState({ userInfo: response.data });
            } else {
                console.log("Sign-In Cancelled by User");
            }
        } catch (error) {
            console.error("Sign-In Error:", error);

            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        console.warn("Google Sign-In is already in progress.");
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.error("Google Play Services not available or outdated.");
                        break;
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.warn("User cancelled Google Sign-In.");
                        break;
                    case statusCodes.SIGN_IN_REQUIRED:
                        console.warn("Sign-In required but not completed.");
                        break;
                    default:
                        console.error("Unexpected Google Sign-In error:", error);
                }
            } else {
                console.error("Non-Google Sign-In Error:", error);
            }
        }
    };

    return (
        <View>
            <Text>Index</Text>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={isInProgress}
            />
        </View>
    );
}
