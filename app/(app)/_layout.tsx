import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/services/auth/AuthContext";

export default function AppLayout() {
    const { session } = useAuth();

    if (!session) {
        return <Redirect href="/sign_in" />;
    }
    return <Stack />;
}
