import { readJson, removeKey, storageKeys, writeJson } from '@/shared/lib/storage';

/**
 * Persistência da sessão no armazenamento local: guarda apenas o id do
 * usuário conectado, para manter o login ao fechar e reabrir o app.
 */
export interface StoredSession {
  userId: string;
  signedInAt: string;
}

export const sessionStorage = {
  load(): Promise<StoredSession | null> {
    return readJson<StoredSession | null>(storageKeys.session, null);
  },

  save(userId: string): Promise<void> {
    return writeJson<StoredSession>(storageKeys.session, { userId, signedInAt: new Date().toISOString() });
  },

  clear(): Promise<void> {
    return removeKey(storageKeys.session);
  },
};
