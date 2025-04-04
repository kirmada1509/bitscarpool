import { Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import useDimensionsContext from "@/utils/theme/dimension_context";

export default function GooglSignInButton({ signIn }: { signIn: () => void }) {
    const screen = useDimensionsContext();

    return (
        <TouchableOpacity
            className="flex-row justify-center items-center border-primary bg-black_1 border-[1px] rounded-2xl py-3"
            style={{ width: screen.width * 0.9 }}
            onPress={signIn}>
            <Image
                source={require("@/assets/images/google-icon.png")}
                className="size-8 object-scale-down mx-3"
            />
            <Text className="text-white text-[18px] font-semibold">
                Sign In with Google
            </Text>
        </TouchableOpacity>
    );
}
