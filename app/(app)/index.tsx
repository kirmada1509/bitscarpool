import { View, Text } from "react-native";
import React from "react";

import useDimensionsContext from "@/utils/theme/dimension_context";

export default function Index() {
    const screen = useDimensionsContext();

    return (
        <View className="h-full flex-col justify-center items-center">
            <Text style={{ color: "red" }}>Welcome to the App</Text>
        </View>
    );
}
