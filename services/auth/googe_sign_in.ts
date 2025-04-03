import {
    GoogleSignin,
    User
} from "@react-native-google-signin/google-signin";

export default async function google_sign_in(): Promise<User | null | Error> {
    await GoogleSignin.configure({
        webClientId:
        process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        scopes: ["profile", "email"],
    });

    try {
        await GoogleSignin.signOut();
        const response = await GoogleSignin.signIn();       
        return response.data;
    } catch (error) {
        return new Error(String(error))
    }
}
