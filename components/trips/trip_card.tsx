import { View, Text } from "react-native";
import React from "react";
import useDimensionsContext from "@/utils/theme/dimension_context";
import { Trip } from "@/utils/models/trip";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/utils/theme/colors";
import { MaterialIcons } from "@expo/vector-icons";

export function TripCard({ trip }: { trip: Trip }) {
    const screen = useDimensionsContext();
    const flexibilityWindow = calculateFlexibilityWindow(
        trip.departure_time,
        trip.flexibility_window
    );

    return (
        <View
            className="relative bg-black_1 rounded-2xl px-4 py-4 border border-gray-800"
            style={{ width: screen.width * 0.9 }}>
            {/* Route */}
            <View className="relative flex-row justify-between items-center px-5">
                {/* From */}
                <View className="bg-primary px-2 py-1.5 rounded-md min-w-[20%]">
                    <Text className="text-black text-base font-bold text-center">
                        {trip.from.toUpperCase().substring(0, 3)}
                    </Text>
                </View>

                <View className="flex-row items-center mx-1.5 flex-1">
                    <View
                        className="flex-1 border-b border-black_3"
                        style={{ borderStyle: "dashed", borderBottomWidth: 1 }}
                    />
                    <Icon
                        name="local-taxi"
                        size={25}
                        color={colors.primary}
                        className="mx-1"
                    />
                    <View
                        className="flex-1 border-b border-black_3"
                        style={{ borderStyle: "dashed", borderBottomWidth: 1 }}
                    />
                </View>
                {/* To */}
                <View className="bg-primary px-2 py-1.5 rounded-md min-w-[20%]">
                    <Text className="text-black text-base font-bold text-center">
                        {trip.to.toUpperCase().substring(0, 3)}
                    </Text>
                </View>
            </View>

            {/* Date & Flex */}
            <View className="flex-row justify-between my-3">
                <View className="flex-row items-center gap-1.5">
                    <Icon name="access-time" size={15} color="#9CA3AF" />
                    <View className="flex-col justify-start items-start">
                        <Text className="text-black_3 text-xs">
                            Date & Time:{" "}
                        </Text>
                        <Text className="text-white text-sm">
                            {parseDateTime(trip.departure_time)}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-1.5">
                    <Icon name="update" size={15} color="#9CA3AF" />
                    <View>
                        <View className="flex-col">
                            <Text className="text-black_3 text-xs">
                                Buffer:{" "}
                            </Text>
                            <Text className="text-white text-xs">
                                {trip.flexibility_window}hrs
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* <View className="border-t border-dashed border-primary mb-2.5" /> */}

            {/* Stats */}
            <View className="flex-row justify-between mb-2">
                <View className="flex-row items-center gap-1.5">
                    <Icon name="event-seat" size={17} color="#6B7280" />
                    <View>
                        <Text className="text-black_3 text-xs">SEATS</Text>
                        <Text className="text-white text-sm">
                            <Text className="text-emerald-400">
                                {trip.seats_available}
                            </Text>
                            /{trip.capacity}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-1.5">
                    <Icon name="directions-car" size={17} color="#6B7280" />
                    <View>
                        <Text className="text-black_3 text-xs">VEHICLE</Text>
                        <Text className="text-white text-sm">
                            {trip.vehicle_model}
                        </Text>
                    </View>
                </View>

                <View className="items-end">
                    <View className="flex-row items-center gap-1 mb-0.5">
                        <Icon
                            name="local-gas-station"
                            size={17}
                            color={fuelIconColor(trip.fuel_type)}
                        />
                        <Text
                            className={`text-xs ${fuelTextColor(
                                trip.fuel_type
                            )}`}>
                            {trip.fuel_type.toUpperCase()}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Icon
                            name="ac-unit"
                            size={17}
                            color={trip.ac ? "#10B981" : "#EF4444"}
                        />
                        <Text
                            className={`text-xs ${
                                trip.ac ? "text-primary" : "text-red-400"
                            }`}>
                            {trip.ac ? "AC" : "NO AC"}
                        </Text>
                    </View>
                </View>
            </View>

            <View className="border-t border-dashed border-primary mb-2.5" />

            {/* <View className="relative  -mx-7">
                <View className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-primary" />
                <View className="flex-row justify-between">
                    <View className="size-6 bg-black rounded-full" />
                    <View className="size-6 bg-black rounded-full" />
                </View>
            </View> */}

            {/* Fare */}
            <View className="flex-row justify-end items-center">
                <MaterialIcons
                    name="currency-rupee"
                    size={20}
                    color={colors.primary}
                />
                <Text className="text-primary text-xl font-bold border-primary border-b">{trip.total_fare}</Text>
            </View>

        </View>
    );
}

export function CompactTripCard({ trip }: { trip: Trip }) {
    const screen = useDimensionsContext();

    return (
        <View
            className="bg-black_2 rounded-xl px-3 py-3 border border-gray-800"
            style={{
                width: screen.width * 0.9,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 5,
            }}>
            {/* Route row */}
            <View className="flex-row justify-between items-center mb-2 px-5">
                <View className="bg-primary px-2 py-1.5 rounded-md min-w-[20%]">
                    <Text className="text-black text-base font-bold text-center">
                        {trip.from.toUpperCase().substring(0, 3)}
                    </Text>
                </View>

                <View className="flex-row items-center mx-1.5 flex-1">
                    <View
                        className="flex-1 border-b border-black_3"
                        style={{ borderStyle: "dashed", borderBottomWidth: 1 }}
                    />
                    <Icon
                        name="local-taxi"
                        size={25}
                        color={colors.primary}
                        className="mx-1"
                    />
                    <View
                        className="flex-1 border-b border-black_3"
                        style={{ borderStyle: "dashed", borderBottomWidth: 1 }}
                    />
                </View>

                <View className="bg-primary px-2 py-1.5 rounded-md min-w-[20%]">
                    <Text className="text-black text-base font-bold text-center">
                        {trip.to.toUpperCase().substring(0, 3)}
                    </Text>
                </View>
            </View>

            {/* Date + Fuel */}
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-1">
                    <Icon name="access-time" size={14} color="#9CA3AF" />
                    <Text className="text-white text-xs">
                        {parseDateTime(trip.departure_time)}
                    </Text>
                </View>

                <View className="flex-row items-center gap-1">
                    <Icon
                        name="local-gas-station"
                        size={14}
                        color={fuelIconColor(trip.fuel_type)}
                    />
                    <Text
                        className={`text-xs ${fuelTextColor(trip.fuel_type)}`}>
                        {trip.fuel_type.toUpperCase()}
                    </Text>
                </View>
            </View>

            {/*Seats + Vehicle + AC */}
            <View className="flex-row justify-between mt-1.5">
                <View className="flex-row gap-3">
                    <View className="flex-row items-center gap-1">
                        <Icon name="event-seat" size={14} color="#9CA3AF" />
                        <Text className="text-white text-xs">
                            <Text className="text-emerald-400">
                                {trip.seats_available}
                            </Text>
                            /{trip.capacity}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Icon name="directions-car" size={14} color="#9CA3AF" />
                        <Text className="text-white text-xs">
                            {trip.vehicle_model}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center gap-1">
                    <Icon
                        name="ac-unit"
                        size={14}
                        color={trip.ac ? "#10B981" : "#EF4444"}
                    />
                    <Text
                        className={`text-xs ${
                            trip.ac ? "text-primary" : "text-red-400"
                        }`}>
                        {trip.ac ? "AC" : "NO AC"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function calculateFlexibilityWindow(
    departureTime: string,
    flexibility: number
) {
    const base = new Date(departureTime);
    return {
        start: formatTime(new Date(base.getTime())),
        end: formatTime(new Date(base.getTime() + flexibility * 3.6e6)),
    };
}

function formatTime(date: Date): string {
    return date
        .toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(" ", "")
        .toLowerCase();
}

function parseDateTime(date: string): string {
    const dt = new Date(date);
    return dt
        .toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(",", "")
        .replace(" ", " ");
}

function fuelIconColor(fuel: string): string {
    switch (fuel.toLowerCase()) {
        case "ev":
            return "#10B981"; // green
        case "cng":
            return "#06B6D4"; // cyan
        default:
            return "#F59E0B"; // amber
    }
}

function fuelTextColor(fuel: string): string {
    switch (fuel.toLowerCase()) {
        case "ev":
            return "text-emerald-400";
        case "cng":
            return "text-cyan-400";
        default:
            return "text-amber-400";
    }
}
