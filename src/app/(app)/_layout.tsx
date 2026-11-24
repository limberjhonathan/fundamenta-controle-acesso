import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/shared/navigation/stackOptions';

/** Área autenticada: listagem e cadastro/atualização de usuários. */
export default function AppLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen name="user-form" />
    </Stack>
  );
}
