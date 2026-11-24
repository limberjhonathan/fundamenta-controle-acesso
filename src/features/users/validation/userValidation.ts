import type { UserFormField, UserFormValues } from '../domain/user';

/**
 * Validação do formulário de usuário (funções puras, fáceis de testar).
 *
 * - Cadastro: todos os campos são obrigatórios.
 * - Atualização: senha é opcional; em branco mantém a senha atual.
 */
export type UserFormMode = 'create' | 'update';
export type UserFormErrors = Partial<Record<UserFormField, string>>;

export const USER_RULES = {
  nameMinLength: 3,
  loginMinLength: 3,
  passwordMinLength: 6,
  loginPattern: /^[a-zA-Z0-9._-]+$/,
} as const;

export function validateUserForm(values: UserFormValues, mode: UserFormMode): UserFormErrors {
  const errors: UserFormErrors = {};
  const name = values.name.trim();
  const login = values.login.trim();

  if (!name) {
    errors.name = 'Informe o nome.';
  } else if (name.length < USER_RULES.nameMinLength) {
    errors.name = `O nome deve ter ao menos ${USER_RULES.nameMinLength} caracteres.`;
  }

  if (!login) {
    errors.login = 'Informe o login.';
  } else if (login.length < USER_RULES.loginMinLength) {
    errors.login = `O login deve ter ao menos ${USER_RULES.loginMinLength} caracteres.`;
  } else if (!USER_RULES.loginPattern.test(login)) {
    errors.login = 'Use apenas letras, números, ponto, hífen ou sublinhado (sem espaços).';
  }

  const wantsPassword = mode === 'create' || values.password.length > 0 || values.confirmPassword.length > 0;

  if (wantsPassword) {
    if (!values.password) {
      errors.password = 'Informe a senha.';
    } else if (values.password.length < USER_RULES.passwordMinLength) {
      errors.password = `A senha deve ter ao menos ${USER_RULES.passwordMinLength} caracteres.`;
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirme a senha.';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'As senhas não conferem.';
    }
  }

  return errors;
}

export function hasErrors(errors: UserFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
