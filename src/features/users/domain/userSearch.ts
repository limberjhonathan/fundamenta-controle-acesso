import type { PublicUser } from './user';

/** Remove acentos e caixa para comparar "José" com "jose". */
function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Filtra usuários por nome ou login (função pura, sem dependência de tela). */
export function filterUsers(users: readonly PublicUser[], query: string): PublicUser[] {
  const term = normalize(query);
  if (!term) return [...users];
  return users.filter((u) => normalize(u.name).includes(term) || normalize(u.login).includes(term));
}
