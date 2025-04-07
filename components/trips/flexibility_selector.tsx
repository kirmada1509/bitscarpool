import { View, Text } from "react-native";
import React, { useState } from "react";
import InputSpinner from "react-native-input-spinner";
import { colors } from "@/utils/theme/colors";

export default function FlexibilitySelector({
    set,
}: {
    set: (num: number) => void;
}) {
    const [count, setCount] = useState(1);
    return (
        <View>
            <InputSpinner
                max={5}
                min={0}
                step={1}
                value={count}
                onChange={(c: number)=>{
                    setCount(c);
                    set(c)
                }}
                editable={false}
                background={colors.black}
                color={colors.black_2}
                height={30}
                width={120}
                textColor={colors.primary}
                style={{ borderColor: colors.primary, borderWidth: 1 }}
            />
        </View>
    );
}
