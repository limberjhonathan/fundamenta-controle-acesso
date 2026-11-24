import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { usePressScale } from '@/shared/animations';
import { haptics } from '@/shared/lib/haptics';
import { colors, radius, sizes } from '@/shared/theme';

type Props = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  /** Texto lido pelo leitor de tela (obrigatório: o botão não tem texto visível). */
  label: string;
  onPress: () => void;
  /** `glass` para fundos escuros da marca; `plain` para fundos claros. */
  variant?: 'glass' | 'plain';
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Botão só com ícone (ações do cabeçalho, mostrar senha, etc.). */
export function IconButton({ icon, label, onPress, variant = 'glass' }: Props) {
  const press = usePressScale(0.94);
  const isGlass = variant === 'glass';

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      onPress={() => {
        haptics.tap();
        onPress();
      }}
      style={[styles.base, isGlass ? styles.glass : styles.plain, press.animatedStyle]}
    >
      <MaterialIcons name={icon} size={22} color={isGlass ? colors.textOnDark : colors.icon} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass: {
    backgroundColor: colors.overlayGlass,
    borderWidth: 1,
    borderColor: colors.overlayGlassBorder,
  },
  plain: {
    backgroundColor: 'transparent',
  },
});
