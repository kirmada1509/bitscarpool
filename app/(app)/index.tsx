import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import useDimensionsContext from "@/utils/theme/dimension_context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/services/auth/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/utils/theme/colors";
import {TripCard, CompactTripCard} from "@/components/trips/trip_card";
import { testTrips } from "@/z_data/trips_data";

export default function Index() {
    const screen = useDimensionsContext();
    const { session } = useAuth();
    const profilePicture = session?.user.photo;
    return (
        <SafeAreaView className="bg-black h-full px-5 py-3">
            <View className="flex-row w-full justify-between items-center mb-5">
                <Image
                    source={require("@/assets/icons/menu.png")}
                    style={{ width: 30 }}
                />
                <FontAwesome name="user-o" size={30} color={colors.primary} />
            </View>

            <View className="gap-2 m-5">
                <Text className="text-primary text-xl font-medium capitalize">
                    Hello! {session?.user.givenName?.split(" ")[0]}
                </Text>
                <Text className="text-white text-3xl capitalize">
                    Where Are You Going?
                </Text>
            </View>

            <TouchableOpacity className="bg-black_2 w-full h-12 rounded-lg flex-row justify-between items-center px-3">
                <AntDesign name="search1" size={20} color={colors.primary} />
                <Text className="flex-1 text-center text-black_3 text-xl font-medium">
                    Search For a Cab
                </Text>
            </TouchableOpacity>

            <View className="mt-10">
                <View className="flex-row justify-between">
                    <Text className="text-white text-xl font-bold">
                        Recently Posted Trips
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-black_3 text-lg font-semibold">
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
                <TripCard trip={testTrips[0]}/>
                <CompactTripCard trip={testTrips[0]}/>
            </View>
        </SafeAreaView>
    );
}
