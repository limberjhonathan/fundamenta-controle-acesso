import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Camada fina e tipada sobre o AsyncStorage.
 *
 * Centraliza a (de)serialização JSON e o prefixo das chaves, para que os
 * repositórios não lidem com strings cruas nem repitam try/catch de parse.
 */
const KEY_PREFIX = '@fundamenta-acesso';

export const storageKeys = {
  users: `${KEY_PREFIX}/users`,
  session: `${KEY_PREFIX}/session`,
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];

export async function readJson<T>(key: StorageKey, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    // Dado corrompido não deve derrubar o app: volta ao valor padrão.
    return fallback;
  }
}

export async function writeJson<T>(key: StorageKey, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeKey(key: StorageKey): Promise<void> {
  await AsyncStorage.removeItem(key);
}
