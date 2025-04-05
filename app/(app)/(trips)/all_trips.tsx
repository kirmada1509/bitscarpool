import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Pressable,
} from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/utils/theme/colors";
import { TripCard } from "@/components/trips/trip_card";
import { testTrips } from "@/z_data/trips_data";
import { router } from "expo-router";

export default function AllTrips() {
    return (
        <SafeAreaView className="bg-black h-full px-5 py-3">
            <TouchableOpacity className="mb-5" onPress={router.back}>
                <Image
                    source={require("@/assets/icons/left-arrow.png")}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>

            <TouchableOpacity className="bg-black_2 w-full h-12 rounded-lg flex-row justify-between items-center px-3">
                <AntDesign name="search1" size={20} color={colors.primary} />
                <Text className="flex-1 text-center text-black_3 text-xl font-medium">
                    Search For a Cab
                </Text>
            </TouchableOpacity>

            <View className="mt-10">
                <FlatList
                    data={testTrips}
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
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 10 }} />
                    )}
                    style={{ flexGrow: 1 }}
                />
            </View>
        </SafeAreaView>
    );
}
