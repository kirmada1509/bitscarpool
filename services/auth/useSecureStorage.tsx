import * as SecureStore from "expo-secure-store";

export async function SecureSave(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function SecureGet(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function SecureDelete(key:string) {
  await SecureStore.deleteItemAsync(key);
}