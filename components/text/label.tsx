import { View, Text } from "react-native";
import React from "react";

export default function Label({label}: {label: string}) {
    return <Text className="text-primary text-[12px] ml-3 mb-2">{label}</Text>;
}
