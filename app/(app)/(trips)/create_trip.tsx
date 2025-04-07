import Label from "@/components/text/label";
import DropdownComponent from "@/components/trips/location_drop_down";
import { useAuth } from "@/services/auth/AuthContext";
import { colors } from "@/utils/theme/colors";
import { testLocations } from "@/z_data/locations";
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicator from "react-native-step-indicator";
import DateAndTimePicker from "@/components/trips/date_time_picker";
import FlexibilitySelector from "@/components/trips/flexibility_selector";
import PagerView from "react-native-pager-view";

export default function Create_Trip() {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [fromLocation, setFromLocation] = useState<string | null>(null);
    const [toLocation, setToLocation] = useState<string | null>(null);
    const [time, setTime] = useState("");
    const { session } = useAuth();
    const [name, setName] = useState<string>(
        session?.user.name
            ?.split(" ")
            .slice(0, 2)
            .toString()
            .replace(",", " ") || ""
    );
    const [buffer, setBuffer] = useState<number>(1);

    const [fare, setFare] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [capacity, setCapacity] = useState("");
    const [seatsAvailable, setSeatsAvailable] = useState("");
    const [fuelType, setFuelType] = useState("");

    const pagerViewRef = useRef<PagerView>(null);

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

            <PagerView
                initialPage={0}
                style={{ flex: 1 }}
                onPageScroll={(e) => setCurrentPosition(e.nativeEvent.position)}
                ref={pagerViewRef}>
                <View key="1">
                    <Step1
                        name={name}
                        setName={setName}
                        fromLocation={fromLocation}
                        setFromLocation={setFromLocation}
                        toLocation={toLocation}
                        setToLocation={setToLocation}
                        time={time}
                        setTime={(date) => {
                            const formattedDate = new Date(date).toLocaleString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                }
                            );
                            setTime(formattedDate);
                        }}
                        setBuffer={setBuffer}
                    />
                </View>

                <View key="2">
                    <Step2
                        fare={fare}
                        setFare={setFare}
                        vehicleModel={vehicleModel}
                        setVehicleModel={setVehicleModel}
                        capacity={capacity}
                        setCapacity={setCapacity}
                        seatsAvailable={seatsAvailable}
                        setSeatsAvailable={setSeatsAvailable}
                        fuelType={fuelType}
                        setFuelType={setFuelType}
                    />
                </View>

                <View key="3">
                    <Step3
                        name={name}
                        fromLocation={fromLocation}
                        toLocation={toLocation}
                        time={time}
                        buffer={buffer}
                        fare={fare}
                        model={vehicleModel}
                        fuel={fuelType}
                        capacity={Number(capacity)}
                        seats={Number(seatsAvailable)}
                        onConfirm={() => {
                            // Replace this with your final trip submission logic
                            console.log("Trip confirmed!");
                            // e.g., submitTrip({ name, fromLocation, ... });
                        }}
                    />
                </View>
            </PagerView>

            {/* {currentPosition === 0 && (
                <Step1
                    name={name}
                    setName={setName}
                    fromLocation={fromLocation}
                    setFromLocation={setFromLocation}
                    toLocation={toLocation}
                    setToLocation={setToLocation}
                    time={time}
                    setTime={(date) => {
                        const formattedDate = new Date(date).toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            }
                        );
                        setTime(formattedDate);
                    }}
                    setBuffer={setBuffer}
                />
            )}

            {currentPosition === 1 && (
                <Step2
                    fare={fare}
                    setFare={setFare}
                    vehicleModel={vehicleModel}
                    setVehicleModel={setVehicleModel}
                    capacity={capacity}
                    setCapacity={setCapacity}
                    seatsAvailable={seatsAvailable}
                    setSeatsAvailable={setSeatsAvailable}
                    fuelType={fuelType}
                    setFuelType={setFuelType}
                />
            )}

            {currentPosition === 2 && (
                <Step3
                    name={name}
                    fromLocation={fromLocation}
                    toLocation={toLocation}
                    time={time}
                    buffer={buffer}
                    fare={fare}
                    model={vehicleModel}
                    fuel={fuelType}
                    capacity={Number(capacity)}
                    seats={Number(seatsAvailable)}
                    onConfirm={() => {
                        // Replace this with your final trip submission logic
                        console.log("Trip confirmed!");
                        // e.g., submitTrip({ name, fromLocation, ... });
                    }}
                />
            )} */}

            <View className="flex-row justify-between gap-2">
                <TouchableOpacity
                    className="bg-black_2 px-5 py-2 rounded-lg w-[40%]"
                    onPress={() => {
                        setCurrentPosition(currentPosition - 1);
                        pagerViewRef.current?.setPage(
                            currentPosition - 1
                        );
                    }}
                    disabled={currentPosition === 0}
                    style={{
                        opacity: currentPosition === 0 ? 0.5 : 1,
                    }}>
                    <Text className="text-white text-lg text-center font-bold">
                        Previous
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-primary px-5 py-2 rounded-lg w-[40%] shadow-black_3 shadow-xl"
                    onPress={() => {
                        setCurrentPosition(currentPosition + 1);
                        pagerViewRef.current?.setPage(
                            currentPosition + 1
                        );
                    }}
                    disabled={currentPosition === stepCount - 1}
                    style={{
                        opacity: currentPosition === stepCount - 1 ? 0.5: 1,
                    }}
                    >
                    <Text className="text-black text-lg text-center font-bold">
                        Next
                    </Text>
                </TouchableOpacity>
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
    time,
    setTime,
    setBuffer,
}: {
    name: string;
    setName: (val: string) => void;
    fromLocation: string | null;
    setFromLocation: (val: string) => void;
    toLocation: string | null;
    setToLocation: (val: string) => void;
    time: string;
    setTime: (val: string) => void;
    setBuffer: (val: number) => void;
}) {
    //creator, from, to, departure time, flexibility window.
    return (
        <View className="flex-col gap-3">
            <Label label={"Name"} />
            <TextInput
                className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                placeholder="Your Name"
                placeholderTextColor={colors.black_3}
                value={name}
                onChangeText={setName}
            />
            <View className="flex-row gap-2">
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
            <DateAndTimePicker set={setTime} />
            <View className="flex-col items-end">
                <Label label="Waiting Buffer (Hrs)" />
                <FlexibilitySelector set={setBuffer} />
            </View>
        </View>
    );
}

function Step2({
    fare,
    setFare,
    vehicleModel,
    setVehicleModel,
    capacity,
    setCapacity,
    seatsAvailable,
    setSeatsAvailable,
    fuelType,
    setFuelType,
}: {
    fare: string;
    setFare: (val: string) => void;
    vehicleModel: string;
    setVehicleModel: (val: string) => void;
    capacity: string;
    setCapacity: (val: string) => void;
    seatsAvailable: string;
    setSeatsAvailable: (val: string) => void;
    fuelType: string;
    setFuelType: (val: string) => void;
}) {
    //fare, vehicle model, capacity, seats available, fuel type
    return (
        <View className="flex-col gap-3">
            <Label label="Fare (₹)" />
            <TextInput
                className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                placeholder="Enter fare"
                placeholderTextColor={colors.black_3}
                keyboardType="numeric"
                value={fare}
                onChangeText={setFare}
            />

            <Label label="Vehicle Model" />
            <TextInput
                className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                placeholder="e.g. Maruti Swift"
                placeholderTextColor={colors.black_3}
                value={vehicleModel}
                onChangeText={setVehicleModel}
            />

            <View className="flex-row gap-2">
                <View className="flex-1">
                    <Label label="Capacity" />
                    <TextInput
                        className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                        placeholder="Total seats"
                        placeholderTextColor={colors.black_3}
                        keyboardType="numeric"
                        value={capacity}
                        onChangeText={setCapacity}
                    />
                </View>
                <View className="flex-1">
                    <Label label="Available Seats" />
                    <TextInput
                        className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                        placeholder="Seats left"
                        placeholderTextColor={colors.black_3}
                        keyboardType="numeric"
                        value={seatsAvailable}
                        onChangeText={setSeatsAvailable}
                    />
                </View>
            </View>

            <Label label="Fuel Type" />
            <TextInput
                className="w-full py-2 px-2 text-left text-xl font-normal tracking-wider bg-black_1 text-white"
                placeholder="e.g. Petrol, Diesel, Electric"
                placeholderTextColor={colors.black_3}
                value={fuelType}
                onChangeText={setFuelType}
            />
        </View>
    );
}

function Step3({
    name,
    fromLocation,
    toLocation,
    time,
    buffer,
    fare,
    model,
    fuel,
    capacity,
    seats,
    onConfirm,
}: {
    name: string;
    fromLocation: string | null;
    toLocation: string | null;
    time: string;
    buffer: number;
    fare: string;
    model: string;
    fuel: string;
    capacity: number;
    seats: number;
    onConfirm: () => void;
}) {
    return (
        <View className="flex-col gap-5">
            <Text className="text-white text-xl font-bold text-center mb-2">
                Confirm Your Trip Details
            </Text>

            <View className="bg-black_2 p-4 rounded-xl space-y-3">
                <Text className="text-white text-base">
                    <Text className="font-bold">Name:</Text> {name}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">From:</Text> {fromLocation}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">To:</Text> {toLocation}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Departure Time:</Text> {time}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Buffer Window:</Text> {buffer}{" "}
                    hour(s)
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Fare:</Text> ₹{fare}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Vehicle Model:</Text> {model}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Fuel Type:</Text> {fuel}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Capacity:</Text> {capacity}
                </Text>
                <Text className="text-white text-base">
                    <Text className="font-bold">Seats Available:</Text> {seats}
                </Text>
            </View>

            <TouchableOpacity
                onPress={onConfirm}
                className="mt-5 bg-primary px-5 py-3 rounded-xl shadow-black_3 shadow-lg">
                <Text className="text-black text-lg font-bold text-center">
                    Confirm Trip
                </Text>
            </TouchableOpacity>
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
