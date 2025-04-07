import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
} from "react-native";
import React, { useState } from "react";
import { colors } from "@/utils/theme/colors";
import useDimensionsContext from "@/utils/theme/dimension_context";
import { AntDesign } from "@expo/vector-icons";

interface DropDownProps {
    zIndex: number;
    label: string;
    placeHolder: string;
    selected: string | null;
    setSelected: (value: string) => void;
    DropDownData: Array<{ id: string; value: string }>;
}

export default function DropDown({
    zIndex,
    label,
    placeHolder,
    selected,
    setSelected,
    DropDownData,
}: DropDownProps) {
    const [showItems, setShowItems] = useState<boolean>(false);
    const [height, setHeight] = useState<number | null>(null);
    const [data, setData] = useState<dropDownDataType[]>(DropDownData);
    const screen = useDimensionsContext();

    return (
        <View className="" style={{ zIndex: zIndex }}>
            <Text className="text-primary text-[12px] ml-3 mb-2">{label}</Text>
            <TouchableOpacity
                className="bg-black_1 py-1 text-center text-xl text-primary placeholder-text-black_3 rounded-lg"
                onLayout={async (e) =>
                    await setHeight(e.nativeEvent.layout.height)
                }
                onPress={() => setShowItems(true)}>
                <Text className="bg-black_1 py-1 text-center text-xl text-primary placeholder-text-black_3 rounded-lg">
                    {selected ?? placeHolder}
                </Text>
            </TouchableOpacity>
            {showItems && (
                <View
                    className="absolute bg-black_2 gap-1 w-full rounded-xl"
                    style={{
                        marginTop: height ? 2 * height : 0,
                        height: screen.height * 0.25,
                    }}>
                    <View className="flex-row items-center bg-black_1 rounded-lg px-3">
                        <AntDesign
                            name="search1"
                            size={20}
                            color={colors.primary}
                        />
                        <TextInput
                            className="flex-1 py-2 text-center text-xl text-primary placeholder-text-black_3"
                            placeholder="Search For Location"
                            placeholderTextColor={colors.black_3}
                            onChangeText={(search) => {
                                if (search === "") {
                                    setData(dropDownData);
                                    return;
                                }
                                setData(
                                    data.filter((item) =>
                                        item.value.startsWith(search)
                                    )
                                );
                            }}
                        />
                    </View>
                    <FlatList
                        scrollEnabled
                        keyboardShouldPersistTaps="always"
                        className=""
                        data={data}
                        renderItem={(item) => (
                            <TouchableOpacity
                                className="py-1 my-1 rounded-xl border-black_1 border-b overflow-visible"
                                onPress={() => {
                                    Keyboard.dismiss();
                                    setSelected(item.item.value);
                                    // setSelected(item.item.value);
                                    setData(dropDownData);
                                    setShowItems(false);
                                }}>
                                <Text className="text-center text-white text-lg">
                                    {item.item.value}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
        </View>
    );
}

type dropDownDataType = {
    id: string;
    value: string;
};

const dropDownData: dropDownDataType[] = [
    { id: "1", value: "Delhi" },
    { id: "2", value: "Mumbai" },
    { id: "3", value: "Bangalore" },
    { id: "4", value: "Hyderabad" },
    { id: "5", value: "Chennai" },
    { id: "6", value: "Kolkata" },
    { id: "7", value: "Pune" },
    { id: "8", value: "Ahmedabad" },
    { id: "9", value: "Jaipur" },
    { id: "10", value: "Lucknow" },
];
