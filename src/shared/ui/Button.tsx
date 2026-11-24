import type { ComponentProps } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { usePressScale } from '@/shared/animations';
import { haptics } from '@/shared/lib/haptics';
import { brand, colors, radius, shadows, sizes, spacing } from '@/shared/theme';

import { AppText } from './AppText';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
export type ButtonVariant = 'brand' | 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Aparência de cada variante: adicionar uma nova não exige mudar o componente. */
const VARIANTS: Record<ButtonVariant, { background?: string; gradient?: readonly [string, string]; text: string; border?: string }> = {
  brand: { gradient: brand.gradient, text: colors.textOnBrand },
  primary: { background: colors.primary, text: colors.onPrimary },
  secondary: { background: colors.surface, text: colors.primary, border: colors.borderStrong },
  ghost: { background: 'transparent', text: colors.primary },
  danger: { background: colors.dangerSoft, text: colors.dangerStrong },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Botão do design system, com animação de toque, vibração e estado de carregamento. */
export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
}: Props) {
  const press = usePressScale();
  const look = VARIANTS[variant];
  const isDisabled = disabled || loading;

  const iconNode = icon && <MaterialIcons name={icon} size={sizes.icon} color={look.text} />;

  const content = loading ? (
    <ActivityIndicator color={look.text} />
  ) : (
    <View style={styles.content}>
      {iconPosition === 'left' && iconNode}
      <AppText variant="button" color={look.text}>
        {title}
      </AppText>
      {iconPosition === 'right' && iconNode}
    </View>
  );

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      onPress={() => {
        haptics.tap();
        onPress();
      }}
      style={[
        styles.base,
        look.background !== undefined && { backgroundColor: look.background },
        look.border && { borderWidth: 1, borderColor: look.border },
        variant === 'brand' && shadows.glow,
        isDisabled && styles.disabled,
        press.animatedStyle,
        style,
      ]}
    >
      {look.gradient ? (
        <LinearGradient colors={look.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.control,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  disabled: {
    opacity: 0.55,
  },
});
