import Label from "@/components/text/label";
import DropdownComponent from "@/components/trips/location_drop_down";
import { useAuth } from "@/services/auth/AuthContext";
import { colors } from "@/utils/theme/colors";
import { testLocations } from "@/z_data/locations";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicator from "react-native-step-indicator";

export default function Create_Trip() {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [fromLocation, setFromLocation] = useState<string | null>(null);
    const [toLocation, setToLocation] = useState<string | null>(null);
    const { session } = useAuth();
    const [name, setName] = useState<string>(
        session?.user.name
            ?.split(" ")
            .slice(0, 2)
            .toString()
            .replace(",", " ") || ""
    );
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

            <Step1
                name={name}
                setName={setName}
                fromLocation={fromLocation}
                setFromLocation={setFromLocation}
                toLocation={toLocation}
                setToLocation={setToLocation}
            />

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

function Step1({
    name,
    setName,
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
}: {
    name: string;
    setName: (val: string) => void;
    fromLocation: string | null;
    setFromLocation: (val: string) => void;
    toLocation: string | null;
    setToLocation: (val: string) => void;
}) {
    //creator, from, to, departure time, flexibility window.

    return (
        <View className="flex-col">
            <Label label={"Name"} />
            <TextInput
                className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                placeholder="Your Name"
                placeholderTextColor={colors.black_3}
                value={name}
                onChangeText={setName}
            />
            <View className="flex-col gap-1 ">
                <DropdownComponent
                    zIndex={2}
                    label="From"
                    placeHolder="Select"
                    selected={fromLocation}
                    setSelected={setFromLocation}
                    DropDownData={testLocations}
                />
                <DropdownComponent
                    zIndex={1}
                    label="To"
                    placeHolder="Select"
                    selected={toLocation}
                    setSelected={setToLocation}
                    DropDownData={testLocations}
                />
            </View>

            
        </View>
    );
}

const labels = ["Location", "Fare", "Confirm"];
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
