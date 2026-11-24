import { useState } from 'react';

import { useUserFormState } from '@/features/users/hooks/useUserFormState';
import type { PublicUser } from '@/features/users/domain/user';

import { useSessionStore } from '../store/useSessionStore';

/** Estado da tela "Criar conta": reaproveita o formulário de usuário e cria a sessão. */
export function useRegisterForm() {
  const register = useSessionStore((s) => s.register);
  const state = useUserFormState('create');
  const [submitting, setSubmitting] = useState(false);

  /** Retorna o usuário criado ou `null` se houver erro. */
  async function submit(): Promise<PublicUser | null> {
    if (submitting || !state.validate()) return null;

    setSubmitting(true);
    try {
      // Em caso de sucesso o guard de rotas leva o usuário para a área logada.
      return await register(state.values);
    } catch (e) {
      state.showError(e);
      setSubmitting(false);
      return null;
    }
  }

  return { ...state, submitting, submit };
}
