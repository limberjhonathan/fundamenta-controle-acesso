import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { enterFast, exit } from '@/shared/animations';
import { colors, radius, spacing } from '@/shared/theme';

import { AppText } from './AppText';

type Props = {
  message: string;
  tone?: 'danger' | 'info';
};

const TONES = {
  danger: { background: colors.dangerSoft, text: colors.dangerStrong, icon: 'error-outline' },
  info: { background: colors.primarySoft, text: colors.primaryPressed, icon: 'info-outline' },
} as const;

/** Aviso em linha (ex.: "Login ou senha inválidos"). */
export function Banner({ message, tone = 'danger' }: Props) {
  const look = TONES[tone];
  return (
    <Animated.View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      entering={enterFast}
      exiting={exit}
      style={[styles.banner, { backgroundColor: look.background }]}
    >
      <MaterialIcons name={look.icon} size={18} color={look.text} />
      <AppText variant="captionStrong" color={look.text} style={styles.text}>
        {message}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  text: {
    flex: 1,
  },
});
