import { useState } from 'react';

import { AppError, getErrorMessage } from '@/shared/errors/AppError';
import { haptics } from '@/shared/lib/haptics';

import type { LoginField } from '../services/authService';
import { useSessionStore } from '../store/useSessionStore';

type FieldErrors = Partial<Record<LoginField, string>>;

/** Estado e ações da tela de login, isolados da interface. */
export function useLoginForm() {
  const signIn = useSessionStore((s) => s.signIn);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function changeLogin(value: string) {
    setLogin(value);
    setFieldErrors((e) => ({ ...e, login: undefined }));
    setFormError(null);
  }

  function changePassword(value: string) {
    setPassword(value);
    setFieldErrors((e) => ({ ...e, password: undefined }));
    setFormError(null);
  }

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    setFieldErrors({});
    setFormError(null);

    try {
      // Em caso de sucesso, a navegação é feita pelo guard de rotas (Stack.Protected).
      await signIn(login, password);
    } catch (error) {
      if (error instanceof AppError && error.field) {
        setFieldErrors({ [error.field as LoginField]: error.message });
      } else {
        setFormError(getErrorMessage(error));
      }
      haptics.error();
      setSubmitting(false);
    }
  }

  return { login, password, fieldErrors, formError, submitting, changeLogin, changePassword, submit };
}
