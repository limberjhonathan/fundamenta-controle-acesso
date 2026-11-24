import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, shadows, spacing } from '@/shared/theme';

/** Barra fixa no rodapé dos formulários (ex.: botão Salvar), respeitando a área segura. */
export function FormActionBar({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.md }]}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    ...shadows.floating,
  },
});
