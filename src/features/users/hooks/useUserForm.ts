import { useEffect, useState } from 'react';

import { getErrorMessage } from '@/shared/errors/AppError';
import { useSessionStore } from '@/features/auth/store/useSessionStore';

import type { PublicUser } from '../domain/user';
import { userService } from '../services/userService';
import { EMPTY_USER_FORM, useUserFormState } from './useUserFormState';

/**
 * Formulário da área logada.
 * Sem `userId` = cadastro; com `userId` = atualização (carrega os dados atuais).
 */
export function useUserForm(userId?: string) {
  const syncSessionUser = useSessionStore((s) => s.syncUser);
  const mode = userId ? 'update' : 'create';
  const state = useUserFormState(mode);
  const { setValues, setFormError, validate, showError } = state;

  const [loading, setLoading] = useState(mode === 'update');
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let active = true;

    userService
      .getById(userId)
      .then((user) => {
        if (!active) return;
        if (!user) {
          setNotFound(true);
          return;
        }
        setValues({ ...EMPTY_USER_FORM, name: user.name, login: user.login });
      })
      .catch((e) => active && setFormError(getErrorMessage(e)))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [userId, setValues, setFormError]);

  /** Valida, salva e retorna o usuário salvo; retorna `null` se houver erro. */
  async function submit(): Promise<PublicUser | null> {
    if (submitting || !validate()) return null;

    setSubmitting(true);
    try {
      const saved = userId ? await userService.update(userId, state.values) : await userService.create(state.values);
      syncSessionUser(saved);
      return saved;
    } catch (e) {
      showError(e);
      return null;
    } finally {
      setSubmitting(false);
    }
  }

  return { ...state, mode, loading, notFound, submitting, submit } as const;
}
