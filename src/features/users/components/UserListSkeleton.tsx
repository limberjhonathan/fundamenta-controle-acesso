import { StyleSheet, View } from 'react-native';

import { colors, radius, sizes, spacing } from '@/shared/theme';
import { Skeleton } from '@/shared/ui';

const PLACEHOLDER_ROWS = 5;

/** Esqueleto da lista exibido enquanto os usuários carregam. */
export function UserListSkeleton() {
  return (
    <View style={styles.list} accessibilityLabel="Carregando usuários" accessibilityRole="progressbar">
      {Array.from({ length: PLACEHOLDER_ROWS }, (_, i) => (
        <View key={i} style={styles.card}>
          <Skeleton width={sizes.avatar} height={sizes.avatar} borderRadius={radius.md} />
          <View style={styles.lines}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="35%" height={10} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  lines: {
    flex: 1,
    gap: spacing.sm,
  },
});
