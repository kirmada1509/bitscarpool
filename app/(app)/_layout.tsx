import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/services/auth/AuthContext";

export default function AppLayout() {
    const { session } = useAuth();

    if (!session) {
        console.log("no session found, back to sign-in");

        return <Redirect href="/sign_in" />;
    }
    console.log("session found");
    return (
        <Stack/>
    );
}
