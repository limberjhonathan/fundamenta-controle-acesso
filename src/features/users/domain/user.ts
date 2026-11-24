/**
 * Entidades do domínio de usuários.
 *
 * `User` é o registro completo persistido (inclui hash e salt da senha).
 * `PublicUser` é o que sai para as telas: nunca expõe dados de senha.
 */
export interface User {
  id: string;
  name: string;
  login: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicUser = Omit<User, 'passwordHash' | 'passwordSalt'>;

/** Dados digitados no formulário de cadastro/atualização. */
export interface UserFormValues {
  name: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export type UserFormField = keyof UserFormValues;

export function toPublicUser({ passwordHash: _hash, passwordSalt: _salt, ...user }: User): PublicUser {
  return user;
}

/** Login é comparado sem diferenciar maiúsculas/minúsculas e sem espaços. */
export function normalizeLogin(login: string): string {
  return login.trim().toLowerCase();
}
