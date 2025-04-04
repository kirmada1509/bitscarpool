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
import { SecureDelete, SecureGet } from "./useSecureStorage";
import { navigate } from "expo-router/build/global-state/routing";

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
        const init = async () => {
            const SecureSession: string | null = await SecureGet("session");
            if (SecureSession != null) {
                console.log("existing session found");
                setSession(JSON.parse(SecureSession));
                router.replace("/(app)");
            }
        };
        init();
    }, []);

    async function signIn() {
        const FireBaseResponse = await google_sign_in();
        if (FireBaseResponse instanceof Error) {
            console.error(FireBaseResponse);
        } else if (FireBaseResponse == null) {
            console.warn("Empty Firebase Response");
        } else {
            console.log("session set to: ", FireBaseResponse.user.givenName);
            setSession(FireBaseResponse);
            router.replace("/(app)");
        }
    }

    async function signOut() {
        await GoogleSignin.signOut();
        const SecureSession: string | null = await SecureGet("session");
        if (SecureSession != null) {
            setSession(null);
            SecureDelete("session");
        }
        router.replace("/sign_in");
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, session }}>
            {children}
        </AuthContext.Provider>
    );
}
