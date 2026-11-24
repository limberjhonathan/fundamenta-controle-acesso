import * as Crypto from 'expo-crypto';

/**
 * Utilitários de criptografia.
 *
 * A senha nunca é salva em texto puro: guardamos apenas o hash SHA-256 de
 * `salt + senha`, com um salt aleatório por usuário.
 */
const SALT_BYTES = 16;

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function generateId(): string {
  return Crypto.randomUUID();
}

export function generateSalt(): string {
  return toHex(Crypto.getRandomBytes(SALT_BYTES));
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

export async function verifyPassword(password: string, salt: string, expectedHash: string): Promise<boolean> {
  const hash = await hashPassword(password, salt);
  return hash === expectedHash;
}
