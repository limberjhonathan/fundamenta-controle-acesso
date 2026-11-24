import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { enter } from '@/shared/animations';
import { BrandSymbol } from '@/shared/brand';
import { colors, palette, radius, spacing } from '@/shared/theme';

import { AppText } from './AppText';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

/** Estado vazio com o símbolo da marca (lista sem itens, busca sem resultado). */
export function EmptyState({ title, description, action }: Props) {
  return (
    <Animated.View entering={enter} style={styles.container}>
      <View style={styles.badge}>
        <BrandSymbol size={44} tone="gradient" />
      </View>
      <AppText variant="h2" align="center">
        {title}
      </AppText>
      {!!description && (
        <AppText variant="body" color={colors.textSecondary} align="center" style={styles.description}>
          {description}
        </AppText>
      )}
      {!!action && <View style={styles.action}>{action}</View>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  badge: {
    width: 88,
    height: 88,
    borderRadius: radius.xl,
    backgroundColor: palette.primary[900],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  description: {
    marginTop: spacing.sm,
  },
  action: {
    marginTop: spacing.xl,
    alignSelf: 'stretch',
  },
});
