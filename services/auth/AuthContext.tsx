import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import google_sign_in from "./googe_sign_in";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { SecureDelete, SecureGet, SecureSave } from "./useSecureStorage";
import { log, warn, error } from "@/utils/logger"; // 👈 Import custom logger

interface AuthContextType {
    signIn: () => void;
    signOut: () => void;
    session: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<User | null>(null);

    useEffect(() => {
        const restoreSession = async () => {
            const storedSession = await SecureGet("session");
            if (storedSession) {
                const parsedSession: User = JSON.parse(storedSession);
                log(
                    "Restored session from secure storage:",
                    parsedSession.user.givenName
                );
                setSession(parsedSession);
                router.replace("/(app)");
            }
        };
        restoreSession();
    }, []);

    async function signIn() {
        log("Attempting Google Sign-In");
        const FireBaseResponse = await google_sign_in();

        if (FireBaseResponse instanceof Error) {
            error("Google Sign-In Error:", FireBaseResponse);
        } else if (FireBaseResponse == null) {
            warn("Empty Firebase Response received");
        } else {
            const user = FireBaseResponse.user;
            log("User signed in:", user.givenName);
            await SecureSave("session", JSON.stringify(FireBaseResponse));
            setSession(FireBaseResponse);
            router.replace("/(app)");
        }
    }

    async function signOut() {
        log("Signing out user");
        await GoogleSignin.signOut();
        await SecureDelete("session");
        setSession(null);
        log("Session cleared, redirecting to /sign_in");
        router.replace("/sign_in");
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, session }}>
            {children}
        </AuthContext.Provider>
    );
}
