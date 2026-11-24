import { readJson, storageKeys, writeJson } from '@/shared/lib/storage';

import { normalizeLogin, type User } from '../domain/user';
import type { UserRepository } from '../domain/userRepository';

/**
 * Implementação do UserRepository usando AsyncStorage (armazenamento local),
 * conforme pedido no enunciado. Todos os usuários ficam em uma única chave
 * como uma lista JSON.
 */
async function readAll(): Promise<User[]> {
  return readJson<User[]>(storageKeys.users, []);
}

async function saveAll(users: User[]): Promise<void> {
  await writeJson(storageKeys.users, users);
}

export const asyncStorageUserRepository: UserRepository = {
  async findAll() {
    return readAll();
  },

  async findById(id) {
    const users = await readAll();
    return users.find((u) => u.id === id) ?? null;
  },

  async findByLogin(login) {
    const target = normalizeLogin(login);
    const users = await readAll();
    return users.find((u) => normalizeLogin(u.login) === target) ?? null;
  },

  async insert(user) {
    const users = await readAll();
    await saveAll([...users, user]);
  },

  async update(user) {
    const users = await readAll();
    await saveAll(users.map((u) => (u.id === user.id ? user : u)));
  },

  async remove(id) {
    const users = await readAll();
    await saveAll(users.filter((u) => u.id !== id));
  },
};
