import type { NativeStackNavigationOptions } from 'expo-router';

import { colors } from '@/shared/theme';

/**
 * Opções padrão das pilhas de navegação. O cabeçalho nativo fica oculto
 * porque cada tela usa o `ScreenHeader` da marca.
 */
export const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  contentStyle: { backgroundColor: colors.background },
};

/** Troca login ↔ área logada com um fade suave. */
export const authSwitchOptions: NativeStackNavigationOptions = {
  animation: 'fade',
};
