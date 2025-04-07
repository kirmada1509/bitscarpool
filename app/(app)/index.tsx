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
import { useAuth } from "@/services/auth/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/utils/theme/colors";
import { CompactTripCard } from "@/components/trips/trip_card";
import { testTrips } from "@/z_data/trips_data";
import { Redirect, router } from "expo-router";

export default function Index() {
    return <Redirect href={"/(app)/(trips)/search_trip"}/>
    const { session } = useAuth();
    // return <Redirect href={"/(app)/(trips)/create_trip"}/>
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
                <Text className="text-white text-3xl">
                    Where are you going?
                </Text>
            </View>

            <TouchableOpacity
                className="bg-black_2 w-full h-12 rounded-lg flex-row justify-between items-center px-3"
                onPress={() => router.push("/(app)/(trips)/search_trip")}>
                <AntDesign name="search1" size={20} color={colors.primary} />
                <Text className="flex-1 text-center text-black_3 text-xl font-medium">
                    Search For a Cab
                </Text>
            </TouchableOpacity>

            {/* recently posted trips */}
            <View className="mt-10 max-h-[50%]">
                <View className="flex-row justify-between mb-3">
                    <Text className="text-white text-xl font-bold">
                        Recently Posted Trips
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(app)/(trips)/all_trips")}>
                        <Text className="text-black_3 text-lg font-semibold">
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>

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
                            <CompactTripCard trip={item.item} />
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

            <View className="flex-col gap-3 mt-3">
                <View className="px-5">
                    <Text className="text-white text-2xl font-medium">
                        Got Empty Seats?
                    </Text>
                    <Text className="text-white text-xl font-light">
                        Share your ride and let others join in.
                    </Text>
                </View>
                <TouchableOpacity
                    className="w-full h-[40px] bg-primary flex-row justify-center items-center rounded-md"
                    onPress={() => {
                        router.push("/(app)/(trips)/create_trip");
                    }}>
                    <Text className="text-black text-2xl font-semibold">
                        Create a Trip
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
