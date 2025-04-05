import { colors } from "@/utils/theme/colors";
import { testTrips } from "@/z_data/trips_data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TripDetailsScreen() {
    const { id } = useLocalSearchParams();
    const trip = testTrips[Number(id)];
    const flex = calculateFlexibilityWindow(
        trip.departure_time,
        trip.flexibility_window
    );

    return (
        <SafeAreaView className="bg-black flex-1 pt-[40px]">
            {/* Custom Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-black bg-black">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mr-3">
                    <Icon name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text className="text-primary text-xl font-bold">
                    {trip.creator}'s Trip
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="px-5">
                {/* Route Section */}
                <View className="bg-black_2 rounded-2xl p-5 border border-gray-800 mb-5">
                    <View className="flex-row justify-between items-center mb-4 px-5">
                        {/* From */}
                        <View className="bg-primary px-3 py-2 rounded-md min-w-[25%]">
                            <Text className="text-black font-bold text-center text-base">
                                {trip.from.toUpperCase().substring(0, 3)}
                            </Text>
                        </View>

                        <View className="flex-row items-center mx-1.5 flex-1">
                            <View
                                className="flex-1 border-b border-black_3"
                                style={{
                                    borderStyle: "dashed",
                                    borderBottomWidth: 1,
                                }}
                            />
                            <Icon
                                name="local-taxi"
                                size={25}
                                color="#45EA69"
                                className="mx-1"
                            />
                            <View
                                className="flex-1 border-b border-black_3"
                                style={{
                                    borderStyle: "dashed",
                                    borderBottomWidth: 1,
                                }}
                            />
                        </View>

                        {/* To */}
                        <View className="bg-primary px-3 py-2 rounded-md min-w-[25%]">
                            <Text className="text-black font-bold text-center text-base">
                                {trip.to.toUpperCase().substring(0, 3)}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center px-5">
                        <Text className="text-white text-right flex-1">{trip.from}</Text>
                        <AntDesign name="arrowright" size={24} color={colors.primary} className="mx-3" />
                        <Text className="text-white text-left flex-1">{trip.to}</Text>
                    </View>
                </View>

                {/* Combined Info Section */}
                <View className="bg-black_2 rounded-2xl p-5 border border-gray-800 mb-5">
                    {/* Time */}
                    <View className="pb-4 mb-2">
                        <View className="flex-row items-center gap-1.5 mb-3">
                            <Icon
                                name="access-time"
                                size={18}
                                color="#9CA3AF"
                            />
                            <View>
                                <Text className="text-black_3 text-xs">
                                    DEPARTURE
                                </Text>
                                <Text className="text-white text-base">
                                    {parseDateTime(trip.departure_time)}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row items-center gap-1.5">
                            <Icon name="update" size={18} color="#9CA3AF" />
                            <View>
                                <View className="flex-row items-center">
                                    <Text className="text-black_3 text-xs">
                                        FLEXIBILITY WINDOW
                                    </Text>
                                    <View className="bg-primary/20 rounded-full px-2 ml-2">
                                        <Text className="text-primary text-xs">
                                            {trip.flexibility_window}hrs
                                        </Text>
                                    </View>
                                </View>
                                <Text className="text-white text-base">
                                    {flex.start} - {flex.end}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Vehicle Details with Icons */}
                    <View className="border-t border-dashed border-primary mb-3" />

                    <View className="pb-4">
                        <Text className="text-gray-400 mb-3">Vehicle Info</Text>

                        <View className="mb-4">
                            <View className="flex-row items-center gap-1.5 mb-1">
                                <Icon
                                    name="directions-car"
                                    size={18}
                                    color="#6B7280"
                                />
                                <Text className="text-black_3 text-xs">
                                    MODEL
                                </Text>
                            </View>
                            <Text className="text-white text-base ml-6">
                                {trip.vehicle_model}
                            </Text>
                        </View>

                        <View className="flex-row mb-2">
                            <View className="w-1/2">
                                <View className="flex-row items-center gap-1.5 mb-1">
                                    <Icon
                                        name="event-seat"
                                        size={18}
                                        color="#6B7280"
                                    />
                                    <Text className="text-black_3 text-xs">
                                        SEATS
                                    </Text>
                                </View>
                                <Text className="text-white ml-6">
                                    <Text className="text-emerald-400">
                                        {trip.seats_available}
                                    </Text>
                                    /{trip.capacity}
                                </Text>
                            </View>

                            <View className="w-1/2">
                                <View className="flex-row items-center gap-1.5 mb-1">
                                    <Icon
                                        name="local-gas-station"
                                        size={18}
                                        color={fuelIconColor(trip.fuel_type)}
                                    />
                                    <Text className="text-black_3 text-xs">
                                        FUEL TYPE
                                    </Text>
                                </View>
                                <Text
                                    className={`ml-6 ${fuelTextColor(
                                        trip.fuel_type
                                    )}`}>
                                    {trip.fuel_type.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <View className="flex-row items-center gap-1.5 mb-1">
                                <Icon
                                    name="ac-unit"
                                    size={18}
                                    color={trip.ac ? "#10B981" : "#EF4444"}
                                />
                                <Text className="text-black_3 text-xs">
                                    COMFORT
                                </Text>
                            </View>
                            <Text
                                className={`ml-6 ${
                                    trip.ac ? "text-primary" : "text-red-400"
                                }`}>
                                {trip.ac ? "AC Available" : "NO AC"}
                            </Text>
                        </View>
                    </View>

                    <View className="border-t border-dashed border-primary mb-3" />

                    {/* Fare */}
                    <View>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-1.5">
                                <Icon
                                    name="payments"
                                    size={18}
                                    color="#45EA69"
                                />
                                <View>
                                    <Text className="text-black_3 text-xs">
                                        TOTAL FARE
                                    </Text>
                                    <Text className="text-white text-lg font-medium">
                                        ₹{trip.total_fare}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                className="bg-primary px-4 py-2 rounded-lg"
                                onPress={() => {
                                    /* Handle payment */
                                }}>
                                <Text className="text-black font-bold">
                                    Pay Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Notes Section - Only if notes exist */}
                {trip.notes?.trim() && (
                    <View className="bg-black_2 rounded-2xl p-5 border border-gray-800 mb-5">
                        <View className="flex-row items-center gap-1.5 mb-2">
                            <Icon name="comment" size={18} color="#9CA3AF" />
                            <Text className="text-black_3 text-xs">NOTES</Text>
                        </View>
                        <Text className="text-white italic ml-6">
                            "{trip.notes.trim()}"
                        </Text>
                    </View>
                )}

                {/* Creator Info - Simplified */}
                <View className="bg-black_2 rounded-2xl p-5 border border-gray-800 mb-5">
                    <View className="flex-row items-center gap-1.5 mb-2">
                        <Icon name="person" size={18} color="#9CA3AF" />
                        <Text className="text-black_3 text-xs">
                            TRIP CREATOR
                        </Text>
                    </View>
                    <Text className="text-white text-base ml-6">
                        {trip.creator}
                    </Text>
                    <Text className="text-gray-400 text-xs ml-6 mt-1">
                        Created on {formatDate(trip.created_at)}
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Action Button */}
            <View className="bg-black_2 p-4 border-t border-gray-800">
                <TouchableOpacity
                    className="bg-primary py-3 rounded-xl flex-row justify-center items-center"
                    onPress={() => {
                        /* Handle booking */
                    }}>
                    <Text className="text-black font-bold text-lg">
                        Book This Trip
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function calculateFlexibilityWindow(date: string | number | Date, hrs: number) {
    const base = new Date(date);
    return {
        start: formatTime(new Date(base.getTime())),
        end: formatTime(new Date(base.getTime() + hrs * 3600000)),
    };
}

function fuelIconColor(fuel: string) {
    switch (fuel.toLowerCase()) {
        case "ev":
            return "#10B981"; // Green for EV
        case "cng":
            return "#06B6D4"; // Cyan for CNG
        default:
            return "#F59E0B"; // Amber for Petrol/Diesel
    }
}

function fuelTextColor(fuel: string) {
    switch (fuel.toLowerCase()) {
        case "ev":
            return "text-emerald-400";
        case "cng":
            return "text-cyan-400";
        default:
            return "text-amber-400";
    }
}

function parseDateTime(date: string | number | Date) {
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

function formatTime(date: Date) {
    return date
        .toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .replace(" ", "")
        .toLowerCase();
}

function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
