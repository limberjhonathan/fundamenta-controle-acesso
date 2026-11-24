import { useCallback } from 'react';
import { Alert, RefreshControl, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSessionStore } from '@/features/auth/store/useSessionStore';
import { getErrorMessage } from '@/shared/errors/AppError';
import { toast } from '@/shared/feedback';
import { layoutChange } from '@/shared/animations';
import { haptics } from '@/shared/lib/haptics';
import { colors, spacing } from '@/shared/theme';
import { Banner, Button, Chip, EmptyState, IconButton, ScreenHeader } from '@/shared/ui';

import { UserCard } from '../components/UserCard';
import { UserListSkeleton } from '../components/UserListSkeleton';
import { UserSearchField } from '../components/UserSearchField';
import type { PublicUser } from '../domain/user';
import { useUsers } from '../hooks/useUsers';

/** Tela 2 — Usuários: listagem com sair e adicionar no cabeçalho (como no mockup). */
export function UserListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentUser = useSessionStore((s) => s.user);
  const signOut = useSessionStore((s) => s.signOut);
  const { users, totalCount, query, setQuery, loading, refreshing, error, currentUserId, refresh, remove } = useUsers();

  const goToCreate = useCallback(() => router.push('/user-form'), [router]);

  const goToEdit = useCallback(
    (user: PublicUser) => router.push({ pathname: '/user-form', params: { id: user.id } }),
    [router],
  );

  const confirmSignOut = useCallback(() => {
    Alert.alert('Sair', 'Deseja realmente sair do app?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => void signOut() },
    ]);
  }, [signOut]);

  const confirmRemove = useCallback(
    (user: PublicUser) => {
      haptics.warning();
      if (user.id === currentUserId) {
        toast.error('Você não pode excluir o usuário com o qual está conectado.');
        return;
      }
      Alert.alert('Excluir usuário', `Deseja excluir "${user.name}"? Esta ação não pode ser desfeita.`, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            remove(user.id)
              .then(() => toast.success('Usuário excluído.'))
              .catch((e) => toast.error(getErrorMessage(e)));
          },
        },
      ]);
    },
    [currentUserId, remove],
  );

  const firstName = currentUser?.name.split(' ')[0] ?? '';
  const countLabel = `${totalCount} ${totalCount === 1 ? 'usuário' : 'usuários'}`;

  return (
    <View style={styles.screen}>
      <ScreenHeader
        eyebrow="Controle de acesso"
        title="Usuários"
        subtitle={firstName ? `Olá, ${firstName}. Gerencie quem acessa o sistema.` : undefined}
        actions={
          <>
            <IconButton icon="logout" label="Sair" onPress={confirmSignOut} />
            <IconButton icon="person-add-alt-1" label="Adicionar usuário" onPress={goToCreate} />
          </>
        }
      >
        <View style={styles.headerFooter}>
          <UserSearchField value={query} onChange={setQuery} />
          {!loading && <Chip label={countLabel} tone="glass" />}
        </View>
      </ScreenHeader>

      {loading ? (
        <UserListSkeleton />
      ) : (
        <Animated.FlatList
          data={users}
          keyExtractor={(u) => u.id}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              isCurrentUser={item.id === currentUserId}
              onPress={goToEdit}
              onLongPress={confirmRemove}
            />
          )}
          itemLayoutAnimation={layoutChange}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={error ? <Banner message={error} /> : undefined}
          ListEmptyComponent={
            error ? undefined : query ? (
              <EmptyState title="Nenhum resultado" description={`Nenhum usuário encontrado para "${query}".`} />
            ) : (
              <EmptyState
                title="Nenhum usuário"
                description="Cadastre o primeiro usuário para começar."
                action={<Button variant="primary" icon="person-add-alt-1" title="Adicionar usuário" onPress={goToCreate} />}
              />
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} colors={[colors.primary]} tintColor={colors.primary} />
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xxl }]}
        />
      )}
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerFooter: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});
