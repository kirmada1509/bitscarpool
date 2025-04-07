import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Label from "../text/label";

export default function DateAndTimePicker({ set }: { set: (v: string) => void }) {
    const [date, setDate] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        const currentDate: Date = selectedDate;
        setDate(currentDate);
        set(currentDate.toString());
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    function parseDate(date: Date): string {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${
            months[date.getMonth()]
        }, ${date.getDate()} ${date.getFullYear()}`;
    }

    function parseTime(date: Date): string {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    }

    return (
        <View className="flex-row gap-2 justify-between">
            <View className="flex-1">
                <Label label="Date" />
                <TouchableOpacity
                    onPress={showDatepicker}
                    className="bg-primary p-2 rounded-lg">
                    <Text className="text-center text-base font-bold">
                        {parseDate(date)}
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex-1">
                <Label label="Time" />
                <TouchableOpacity
                    onPress={showTimepicker}
                    className="bg-primary p-2 rounded-lg">
                    <Text className="text-center text-base font-bold">
                        {parseTime(date)}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
