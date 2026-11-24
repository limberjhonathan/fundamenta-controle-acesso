import { AppError } from '@/shared/errors/AppError';
import { verifyPassword } from '@/shared/lib/crypto';
import { asyncStorageUserRepository } from '@/features/users/data/asyncStorageUserRepository';
import { toPublicUser, type PublicUser, type UserFormValues } from '@/features/users/domain/user';
import type { UserRepository } from '@/features/users/domain/userRepository';
import { userService, type UserService } from '@/features/users/services/userService';

import { sessionStorage } from '../data/sessionStorage';

export type LoginField = 'login' | 'password';

// Mesma mensagem para login inexistente e senha errada: não revela quais logins existem.
const INVALID_CREDENTIALS = 'Login ou senha inválidos.';

type Dependencies = {
  repository: UserRepository;
  users: UserService;
  session: typeof sessionStorage;
};

/**
 * Regras de autenticação. As dependências chegam por parâmetro (inversão de
 * dependência), então o service pode ser testado com implementações em memória.
 */
export function createAuthService({ repository, users, session }: Dependencies) {
  return {
    async signIn(login: string, password: string): Promise<PublicUser> {
      if (!login.trim()) throw new AppError<LoginField>('Informe o login.', 'login');
      if (!password) throw new AppError<LoginField>('Informe a senha.', 'password');

      const user = await repository.findByLogin(login);
      const valid = user ? await verifyPassword(password, user.passwordSalt, user.passwordHash) : false;

      if (!user || !valid) throw new AppError(INVALID_CREDENTIALS);

      await session.save(user.id);
      return toPublicUser(user);
    },

    /**
     * "Criar conta" pela tela de login: cadastra com as mesmas regras do
     * cadastro interno e já inicia a sessão do novo usuário.
     */
    async register(values: UserFormValues): Promise<PublicUser> {
      const user = await users.create(values);
      await session.save(user.id);
      return user;
    },

    async signOut(): Promise<void> {
      await session.clear();
    },

    /** Recupera o usuário da sessão salva; limpa a sessão se o usuário não existir mais. */
    async restore(): Promise<PublicUser | null> {
      const stored = await session.load();
      if (!stored) return null;

      const user = await repository.findById(stored.userId);
      if (!user) {
        await session.clear();
        return null;
      }
      return toPublicUser(user);
    },
  };
}

export const authService = createAuthService({
  repository: asyncStorageUserRepository,
  users: userService,
  session: sessionStorage,
});
