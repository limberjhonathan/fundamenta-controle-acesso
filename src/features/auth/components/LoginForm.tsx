import { useRef } from 'react';
import { Pressable, StyleSheet, View, type TextInputInstance } from 'react-native';

import { colors, spacing } from '@/shared/theme';
import { AppText, Banner, Button, TextField } from '@/shared/ui';

import type { useLoginForm } from '../hooks/useLoginForm';

type Props = {
  form: ReturnType<typeof useLoginForm>;
  onCreateAccount: () => void;
};

/** Campos e ação de entrar (componente de apresentação: recebe o estado pronto). */
export function LoginForm({ form, onCreateAccount }: Props) {
  const passwordRef = useRef<TextInputInstance>(null);

  return (
    <View>
      <AppText variant="h1">Bem-vindo</AppText>
      <AppText variant="body" color={colors.textSecondary} style={styles.subtitle}>
        Insira suas credenciais para acessar o controle de acesso.
      </AppText>

      <TextField
        label="Login"
        icon="person-outline"
        placeholder="Seu login"
        value={form.login}
        onChangeText={form.changeLogin}
        error={form.fieldErrors.login}
        autoCapitalize="none"
        autoComplete="username"
        textContentType="username"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextField
        ref={passwordRef}
        label="Senha"
        icon="lock-outline"
        placeholder="••••••••"
        value={form.password}
        onChangeText={form.changePassword}
        error={form.fieldErrors.password}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={form.submit}
      />

      {!!form.formError && <Banner message={form.formError} />}

      <Button
        variant="brand"
        title="Acessar Fundamenta"
        icon="arrow-forward"
        iconPosition="right"
        onPress={form.submit}
        loading={form.submitting}
        style={styles.submit}
      />

      <View style={styles.signup}>
        <AppText variant="body" color={colors.textSecondary}>
          Não tem conta?
        </AppText>
        <Pressable accessibilityRole="link" hitSlop={8} onPress={onCreateAccount}>
          {({ pressed }) => (
            <AppText variant="bodyStrong" color={colors.primary} style={pressed && styles.pressed}>
              Criar conta
            </AppText>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  submit: {
    marginTop: spacing.xs,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  pressed: {
    opacity: 0.6,
  },
});
