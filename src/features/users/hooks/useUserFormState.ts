import { useCallback, useState } from 'react';

import { AppError, getErrorMessage } from '@/shared/errors/AppError';
import { haptics } from '@/shared/lib/haptics';

import type { UserFormField, UserFormValues } from '../domain/user';
import { hasErrors, validateUserForm, type UserFormErrors, type UserFormMode } from '../validation/userValidation';

export const EMPTY_USER_FORM: UserFormValues = { name: '', login: '', password: '', confirmPassword: '' };

/**
 * Estado reutilizável do formulário de usuário (valores, erros e validação).
 * Usado tanto no cadastro interno/edição quanto no "Criar conta" do login,
 * evitando duplicar regras entre as telas.
 */
export function useUserFormState(mode: UserFormMode) {
  const [values, setValues] = useState<UserFormValues>(EMPTY_USER_FORM);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const setField = useCallback((field: UserFormField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setFormError(null);
  }, []);

  /** Valida os valores atuais; retorna `true` se estiver tudo certo. */
  const validate = useCallback((): boolean => {
    const result = validateUserForm(values, mode);
    setErrors(result);
    if (hasErrors(result)) {
      haptics.error();
      return false;
    }
    return true;
  }, [values, mode]);

  /** Mostra o erro vindo do service no campo certo (ou como aviso geral). */
  const showError = useCallback((error: unknown) => {
    haptics.error();
    if (error instanceof AppError && error.field) {
      setErrors({ [error.field as UserFormField]: error.message });
    } else {
      setFormError(getErrorMessage(error));
    }
  }, []);

  return { values, setValues, errors, formError, setFormError, setField, validate, showError };
}

export type UserFormState = ReturnType<typeof useUserFormState>;
