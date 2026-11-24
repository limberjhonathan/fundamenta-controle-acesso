import { create } from 'zustand';

import type { PublicUser, UserFormValues } from '@/features/users/domain/user';
import { userService } from '@/features/users/services/userService';

import { authService } from '../services/authService';

/**
 * Estado global da sessão.
 *
 * - `loading`: app abrindo, ainda verificando se há sessão salva.
 * - `authenticated` / `unauthenticated`: define quais rotas ficam liberadas.
 */
type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface SessionState {
  status: SessionStatus;
  user: PublicUser | null;
  bootstrap: () => Promise<void>;
  signIn: (login: string, password: string) => Promise<void>;
  /** Cria a conta pela tela de login e já entra no app. */
  register: (values: UserFormValues) => Promise<PublicUser>;
  signOut: () => Promise<void>;
  /** Atualiza os dados do usuário logado após ele próprio ser editado. */
  syncUser: (user: PublicUser) => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  status: 'loading',
  user: null,

  async bootstrap() {
    try {
      await userService.ensureDefaultAdmin();
      const user = await authService.restore();
      set({ user, status: user ? 'authenticated' : 'unauthenticated' });
    } catch {
      set({ user: null, status: 'unauthenticated' });
    }
  },

  async signIn(login, password) {
    const user = await authService.signIn(login, password);
    set({ user, status: 'authenticated' });
  },

  async register(values) {
    const user = await authService.register(values);
    set({ user, status: 'authenticated' });
    return user;
  },

  async signOut() {
    await authService.signOut();
    set({ user: null, status: 'unauthenticated' });
  },

  syncUser(user) {
    if (get().user?.id === user.id) set({ user });
  },
}));
