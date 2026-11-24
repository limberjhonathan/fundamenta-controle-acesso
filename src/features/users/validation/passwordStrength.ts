import { USER_RULES } from './userValidation';

export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrength {
  level: PasswordStrengthLevel;
  label: string;
}

const LABELS: Record<PasswordStrengthLevel, string> = {
  0: '',
  1: 'Fraca',
  2: 'Razoável',
  3: 'Boa',
  4: 'Forte',
};

/**
 * Estimativa simples de força da senha (função pura), usada só como
 * orientação visual — a regra obrigatória continua sendo o tamanho mínimo.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { level: 0, label: LABELS[0] };

  let score = 0;
  if (password.length >= USER_RULES.passwordMinLength) score++;
  if (password.length >= 10) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const level = Math.max(1, Math.min(4, score)) as PasswordStrengthLevel;
  // Abaixo do mínimo exigido é sempre "Fraca".
  const finalLevel: PasswordStrengthLevel = password.length < USER_RULES.passwordMinLength ? 1 : level;
  return { level: finalLevel, label: LABELS[finalLevel] };
}
