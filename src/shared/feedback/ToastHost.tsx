import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { brand, colors, duration, radius, shadows, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui/AppText';

import { useToastStore, type ToastTone } from './toastStore';

const TONES: Record<ToastTone, { icon: 'check-circle' | 'error' | 'info'; iconColor: string }> = {
  success: { icon: 'check-circle', iconColor: brand.lime },
  error: { icon: 'error', iconColor: colors.danger },
  info: { icon: 'info', iconColor: colors.textOnDark },
};

/** Exibe o toast atual no topo da tela, acima de qualquer rota. */
export function ToastHost() {
  const current = useToastStore((s) => s.current);
  const dismiss = useToastStore((s) => s.dismiss);
  const insets = useSafeAreaInsets();

  if (!current) return null;
  const look = TONES[current.tone];

  return (
    <Animated.View
      key={current.id}
      pointerEvents="box-none"
      entering={FadeInUp.duration(duration.base)}
      exiting={FadeOutUp.duration(duration.fast)}
      style={[styles.wrapper, { top: insets.top + spacing.sm }]}
    >
      <Pressable
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        accessibilityHint="Toque para fechar"
        onPress={dismiss}
        style={styles.toast}
      >
        <MaterialIcons name={look.icon} size={22} color={look.iconColor} />
        <AppText variant="bodyStrong" color={colors.textOnDark} style={styles.text}>
          {current.message}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 100,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.lg,
    backgroundColor: brand.dark,
    borderWidth: 1,
    borderColor: 'rgba(184, 243, 107, 0.25)',
    ...shadows.floating,
  },
  text: {
    flex: 1,
  },
});
