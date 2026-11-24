import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from 'expo-router';

import { getErrorMessage } from '@/shared/errors/AppError';
import { useSessionStore } from '@/features/auth/store/useSessionStore';

import type { PublicUser } from '../domain/user';
import { filterUsers } from '../domain/userSearch';
import { userService } from '../services/userService';

/**
 * Lista de usuários da tela de listagem.
 * Recarrega sempre que a tela volta ao foco (ex.: depois de salvar um cadastro).
 */
export function useUsers() {
  const currentUserId = useSessionStore((s) => s.user?.id);

  const [users, setUsers] = useState<PublicUser[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setUsers(await userService.list());
    } catch (e) {
      setError(getErrorMessage(e, 'Não foi possível carregar os usuários.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const remove = useCallback(
    async (id: string) => {
      await userService.remove(id, currentUserId);
      setUsers((list) => list.filter((u) => u.id !== id));
    },
    [currentUserId],
  );

  const visibleUsers = useMemo(() => filterUsers(users, query), [users, query]);

  return {
    users: visibleUsers,
    totalCount: users.length,
    query,
    setQuery,
    loading,
    refreshing,
    error,
    currentUserId,
    refresh,
    remove,
  };
}
