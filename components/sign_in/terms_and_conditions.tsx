import { View, Text, Linking } from "react-native";
import React from "react";

export default function TermsAndConditions() {
    return (
        <View className="mt-4 w-[85%]">
            <Text className="text-gray-400 text-xs text-center leading-5">
                By continuing, you agree to our{" "}
                <Text
                    className="text-primary underline"
                    onPress={() =>
                        Linking.openURL(
                            "https://yourdomain.com/terms-and-conditions"
                        )
                    }>
                    Terms & Conditions
                </Text>{" "}
                and{" "}
                <Text
                    className="text-primary underline"
                    onPress={() =>
                        Linking.openURL("https://yourdomain.com/privacy-policy")
                    }>
                    Privacy Policy
                </Text>
                .
            </Text>
        </View>
    );
}
