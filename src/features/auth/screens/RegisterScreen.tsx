import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { UserFormFields } from '@/features/users/components/UserFormFields';
import { toast } from '@/shared/feedback';
import { colors, spacing } from '@/shared/theme';
import { Button, FormActionBar, KeyboardAwareScroll, ScreenHeader } from '@/shared/ui';

import { useRegisterForm } from '../hooks/useRegisterForm';

/**
 * Criar conta (acessível pela tela de login).
 * Usa os mesmos campos e regras do cadastro de usuário e, ao concluir,
 * já entra no app com a nova conta.
 */
export function RegisterScreen() {
  const router = useRouter();
  const form = useRegisterForm();

  async function handleRegister() {
    const user = await form.submit();
    if (user) toast.success(`Conta criada. Bem-vindo, ${user.name.split(' ')[0]}!`);
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        eyebrow="Fundamenta"
        title="Criar conta"
        subtitle="Cadastre-se para acessar o controle de acesso."
        onBack={() => router.back()}
      />

      <KeyboardAwareScroll
        contentContainerStyle={styles.content}
        footer={
          <FormActionBar>
            <Button
              variant="brand"
              title="Criar conta"
              icon="person-add-alt-1"
              onPress={handleRegister}
              loading={form.submitting}
            />
            <Button variant="ghost" title="Já tenho conta · Entrar" onPress={() => router.back()} />
          </FormActionBar>
        }
      >
        <UserFormFields form={form} onSubmit={handleRegister} />
      </KeyboardAwareScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
