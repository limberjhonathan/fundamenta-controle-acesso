import { useRef } from 'react';
import type { TextInputInstance } from 'react-native';

import { Banner, FormSection, TextField } from '@/shared/ui';

import type { UserFormState } from '../hooks/useUserFormState';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

type Props = {
  form: Pick<UserFormState, 'values' | 'errors' | 'formError' | 'setField'>;
  /** Na edição a senha é opcional (em branco mantém a atual). */
  isEdit?: boolean;
  /** Chamado ao confirmar o último campo pelo teclado. */
  onSubmit: () => void;
};

/**
 * Campos do usuário (Nome, Login, Senha, Confirmar senha) agrupados em seções.
 * Componente único usado no "Novo/Editar Usuário" e no "Criar conta".
 */
export function UserFormFields({ form, isEdit = false, onSubmit }: Props) {
  const loginRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);
  const confirmRef = useRef<TextInputInstance>(null);

  return (
    <>
      <FormSection title="Dados do usuário" icon="badge" description="Como o usuário será identificado.">
        <TextField
          label="Nome"
          icon="person-outline"
          placeholder="Nome completo"
          value={form.values.name}
          onChangeText={(v) => form.setField('name', v)}
          error={form.errors.name}
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => loginRef.current?.focus()}
        />
        <TextField
          ref={loginRef}
          label="Login"
          icon="alternate-email"
          placeholder="ex.: joao.silva"
          value={form.values.login}
          onChangeText={(v) => form.setField('login', v)}
          error={form.errors.login}
          autoCapitalize="none"
          autoComplete="username"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
      </FormSection>

      <FormSection
        title="Senha"
        icon="lock-outline"
        description={isEdit ? 'Deixe em branco para manter a senha atual.' : 'Mínimo de 6 caracteres.'}
      >
        <TextField
          ref={passwordRef}
          label={isEdit ? 'Nova senha' : 'Senha'}
          icon="lock-outline"
          placeholder="••••••••"
          value={form.values.password}
          onChangeText={(v) => form.setField('password', v)}
          error={form.errors.password}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <PasswordStrengthMeter password={form.values.password} />
        <TextField
          ref={confirmRef}
          label="Confirmar senha"
          icon="lock-reset"
          placeholder="Repita a senha"
          value={form.values.confirmPassword}
          onChangeText={(v) => form.setField('confirmPassword', v)}
          error={form.errors.confirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      </FormSection>

      {!!form.formError && <Banner message={form.formError} />}
    </>
  );
}
