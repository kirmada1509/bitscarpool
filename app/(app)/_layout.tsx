import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/services/auth/AuthContext";

export default function _layout() {
    const { session } = useAuth();

    if (!session) {
        console.log("no session");
        return <Redirect href={"/sign_in"}/>
    }
    console.log("session found");
    return (
        <Stack>
            <Stack.Screen name="index"></Stack.Screen>
        </Stack>
    );
}
