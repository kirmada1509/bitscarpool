import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@/services/auth/AuthContext";

export default function SignIn() {
    const {session, signOut } = useAuth();
    return (
        <View>
            <Text>Welcome {session?.user.givenName}</Text>
            <Pressable onPress={signOut}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    );
}
