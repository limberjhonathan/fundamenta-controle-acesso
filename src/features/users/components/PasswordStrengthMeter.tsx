import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { brand, colors, duration, palette, radius, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

import { getPasswordStrength } from '../validation/passwordStrength';

const LEVEL_COLORS = [colors.border, colors.danger, colors.warning, brand.green, palette.primary[700]];

/** Barra que mostra a força da senha enquanto o usuário digita. */
export function PasswordStrengthMeter({ password }: { password: string }) {
  const { level, label } = getPasswordStrength(password);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(withTiming(level, { duration: duration.base }));
  }, [level, progress]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${(progress.value / 4) * 100}%`,
    backgroundColor: interpolateColor(progress.value, [0, 1, 2, 3, 4], LEVEL_COLORS),
  }));

  if (!password) return null;

  return (
    <View style={styles.container} accessibilityLabel={`Força da senha: ${label}`}>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, barStyle]} />
      </View>
      <AppText variant="captionStrong" color={LEVEL_COLORS[level]} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: radius.pill,
  },
  label: {
    minWidth: 64,
    textAlign: 'right',
  },
});
