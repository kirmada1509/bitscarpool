import Label from "@/components/text/label";
import DropdownComponent from "@/components/trips/location_drop_down";
import { testLocations } from "@/z_data/locations";
import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    Pressable,
    Image,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateAndTimePicker from "@/components/trips/date_time_picker";
import FlexibilitySelector from "@/components/trips/flexibility_selector";
import { CompactTripCard, TripCard } from "@/components/trips/trip_card";
import { testTrips } from "@/z_data/trips_data";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/utils/theme/colors";

export default function SearchTrips() {
    const [fromLocation, setFromLocation] = useState<string | null>(null);
    const [toLocation, setToLocation] = useState<string | null>(null);

    return (
        <SafeAreaView className="flex-1 bg-black justify-between py-10 px-5 gap-3">
            <View className="flex-row">
                <Image
                    source={require("@/assets/icons/menu.png")}
                    style={{ width: 30 }}
                />
                <Text className="text-primary text-xl font-medium text-center flex-1">
                    Search For trips
                </Text>
            </View>
            <View className="flex-col gap-3">
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
            </View>

            <View className="w-full border-b-2 border-dotted border-black_3 my-2" />
            <TouchableOpacity className="bg-black_1 flex-row flex-wrap self-start px-2 py-1 rounded-lg border border-primary">
                <AntDesign name="filter" size={16} color={colors.primary} />
                <Text className="text-primary text-base tracking-wider ml-1">Filter</Text>
            </TouchableOpacity>
            <View>
                <FlatList
                    data={testTrips.slice(0, 5)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item) => (
                        <Pressable
                            onPress={() =>
                                router.push(
                                    `/(app)/(trips)/detailed_view/${item.index}`
                                )
                            }>
                            <TripCard trip={item.item} />
                        </Pressable>
                    )}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10 }} />
                    )}
                    style={{ flexGrow: 1, borderRadius: 10 }}
                />
            </View>
        </SafeAreaView>
    );
}
