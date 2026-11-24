import type { ComponentProps, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { enter } from '@/shared/animations';
import { colors, palette, radius, shadows, spacing } from '@/shared/theme';

import { AppText } from './AppText';

type Props = {
  title: string;
  icon: ComponentProps<typeof MaterialIcons>['name'];
  description?: string;
  children: ReactNode;
};

/** Card que agrupa campos relacionados de um formulário. */
export function FormSection({ title, icon, description, children }: Props) {
  return (
    <Animated.View entering={enter} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <MaterialIcons name={icon} size={18} color={palette.primary[600]} />
        </View>
        <View style={styles.titles}>
          <AppText variant="title">{title}</AppText>
          {!!description && (
            <AppText variant="caption" color={colors.textMuted}>
              {description}
            </AppText>
          )}
        </View>
      </View>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xs,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flex: 1,
  },
});
