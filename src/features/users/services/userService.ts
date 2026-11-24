import { AppError } from '@/shared/errors/AppError';
import { generateId, generateSalt, hashPassword } from '@/shared/lib/crypto';

import { asyncStorageUserRepository } from '../data/asyncStorageUserRepository';
import { toPublicUser, type PublicUser, type User, type UserFormField, type UserFormValues } from '../domain/user';
import type { UserRepository } from '../domain/userRepository';
import { hasErrors, validateUserForm } from '../validation/userValidation';

/** Usuário criado no primeiro uso para permitir o acesso inicial. */
export const DEFAULT_ADMIN = { name: 'Administrador', login: 'admin', password: 'admin123' } as const;

/**
 * Regras de negócio de usuários. Recebe o repositório por parâmetro
 * (injeção de dependência), o que permite testar com um repositório em memória.
 */
export function createUserService(repository: UserRepository) {
  async function assertLoginAvailable(login: string, ignoreId?: string) {
    const existing = await repository.findByLogin(login);
    if (existing && existing.id !== ignoreId) {
      throw new AppError<UserFormField>('Este login já está em uso.', 'login');
    }
  }

  function assertValid(values: UserFormValues, mode: 'create' | 'update') {
    const errors = validateUserForm(values, mode);
    if (hasErrors(errors)) {
      const [field, message] = Object.entries(errors)[0] as [UserFormField, string];
      throw new AppError<UserFormField>(message, field);
    }
  }

  const service = {
    async list(): Promise<PublicUser[]> {
      const users = await repository.findAll();
      return users.map(toPublicUser).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    },

    async getById(id: string): Promise<PublicUser | null> {
      const user = await repository.findById(id);
      return user ? toPublicUser(user) : null;
    },

    async create(values: UserFormValues): Promise<PublicUser> {
      assertValid(values, 'create');
      await assertLoginAvailable(values.login);

      const now = new Date().toISOString();
      const passwordSalt = generateSalt();
      const user: User = {
        id: generateId(),
        name: values.name.trim(),
        login: values.login.trim(),
        passwordSalt,
        passwordHash: await hashPassword(values.password, passwordSalt),
        createdAt: now,
        updatedAt: now,
      };

      await repository.insert(user);
      return toPublicUser(user);
    },

    async update(id: string, values: UserFormValues): Promise<PublicUser> {
      const current = await repository.findById(id);
      if (!current) throw new AppError('Usuário não encontrado.');

      assertValid(values, 'update');
      await assertLoginAvailable(values.login, id);

      const updated: User = {
        ...current,
        name: values.name.trim(),
        login: values.login.trim(),
        updatedAt: new Date().toISOString(),
      };

      // Senha em branco na edição = manter a senha atual.
      if (values.password) {
        updated.passwordSalt = generateSalt();
        updated.passwordHash = await hashPassword(values.password, updated.passwordSalt);
      }

      await repository.update(updated);
      return toPublicUser(updated);
    },

    async remove(id: string, currentUserId: string | undefined): Promise<void> {
      if (id === currentUserId) {
        throw new AppError('Você não pode excluir o usuário com o qual está conectado.');
      }
      await repository.remove(id);
    },

    /** Garante que exista ao menos um usuário para o primeiro login. */
    async ensureDefaultAdmin(): Promise<void> {
      const users = await repository.findAll();
      if (users.length > 0) return;

      await service.create({
        name: DEFAULT_ADMIN.name,
        login: DEFAULT_ADMIN.login,
        password: DEFAULT_ADMIN.password,
        confirmPassword: DEFAULT_ADMIN.password,
      });
    },
  };

  return service;
}

export type UserService = ReturnType<typeof createUserService>;

export const userService = createUserService(asyncStorageUserRepository);
