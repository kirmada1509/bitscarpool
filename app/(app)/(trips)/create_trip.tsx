import { colors } from "@/utils/theme/colors";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicator from "react-native-step-indicator";

export default function Create_Trip() {
    const [currentPosition, setCurrentPosition] = useState(0);
    const stepCount = 3;

    return (
        <SafeAreaView className="flex-1 bg-black justify-between py-10 px-5">
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={3}
                onPress={(step) => setCurrentPosition(step)}
            />

            <View style={{ marginTop: 40 }}>
                <Text style={{ fontSize: 18, textAlign: "center", color: colors.primary}}>
                    Current Step: {labels[currentPosition]}
                </Text>
            </View>

            <View className="flex-row justify-between gap-2">
                {currentPosition > 0 ? (
                    <TouchableOpacity
                        className="bg-black_2 px-5 py-2 rounded-lg w-[40%]"
                        onPress={() => setCurrentPosition(currentPosition - 1)}>
                        <Text className="text-white text-lg text-center font-bold">
                            Previous
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
                {currentPosition < stepCount - 1 ? (
                    <TouchableOpacity
                        className="bg-primary px-5 py-2 rounded-lg w-[40%] shadow-black_3 shadow-xl"
                        onPress={() => setCurrentPosition(currentPosition + 1)}>
                        <Text className="text-black  text-lg text-center font-bold">
                            Next
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
            </View>
        </SafeAreaView>
    );
}

const labels = ["Login", "Shipping", "Payment"];

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 1,
    stepStrokeUnFinishedColor: colors.primary,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.black_3,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.black_2,
    stepIndicatorCurrentColor: colors.black_2,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: colors.white,
    stepIndicatorLabelFinishedColor: colors.black,
    stepIndicatorLabelUnFinishedColor: "#FFFFFF",
    labelColor: colors.primary,
    labelSize: 13,
    currentStepLabelColor: colors.primary,
};
