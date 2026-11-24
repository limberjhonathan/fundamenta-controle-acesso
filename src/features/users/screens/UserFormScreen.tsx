import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { toast } from '@/shared/feedback';
import { colors, spacing } from '@/shared/theme';
import { Button, EmptyState, FormActionBar, KeyboardAwareScroll, ScreenHeader } from '@/shared/ui';

import { UserFormFields } from '../components/UserFormFields';
import { UserPreviewCard } from '../components/UserPreviewCard';
import { useUserForm } from '../hooks/useUserForm';

/** Tela 3 — Novo Usuário / Editar Usuário: nome, login, senha e confirmação + "Salvar". */
export function UserFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const form = useUserForm(id);
  const isEdit = form.mode === 'update';

  async function handleSave() {
    const saved = await form.submit();
    if (!saved) return;

    toast.success(isEdit ? 'Usuário atualizado com sucesso.' : 'Usuário cadastrado com sucesso.');
    router.back();
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        eyebrow="Controle de acesso"
        title={isEdit ? 'Editar Usuário' : 'Novo Usuário'}
        subtitle={isEdit ? 'Atualize os dados de acesso.' : 'Preencha os dados para liberar o acesso.'}
        onBack={() => router.back()}
      >
        {!form.loading && !form.notFound && <UserPreviewCard name={form.values.name} login={form.values.login} />}
      </ScreenHeader>

      {form.loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : form.notFound ? (
        <EmptyState
          title="Usuário não encontrado"
          description="Ele pode ter sido excluído."
          action={<Button variant="secondary" title="Voltar para a lista" icon="arrow-back" onPress={() => router.back()} />}
        />
      ) : (
        <KeyboardAwareScroll
          contentContainerStyle={styles.content}
          footer={
            <FormActionBar>
              <Button variant="brand" title="Salvar" icon="save" onPress={handleSave} loading={form.submitting} />
            </FormActionBar>
          }
        >
          <UserFormFields form={form} isEdit={isEdit} onSubmit={handleSave} />
        </KeyboardAwareScroll>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
});
