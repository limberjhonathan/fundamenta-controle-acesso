import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { duration } from '@/shared/theme';

/**
 * Feedback de toque discreto: o elemento reduz levemente ao ser pressionado.
 * Retorna o estilo animado e os handlers para ligar em um Pressable.
 */
export function usePressScale(pressedScale = 0.98) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return {
    animatedStyle,
    onPressIn: () => {
      scale.set(withTiming(pressedScale, { duration: duration.fast }));
    },
    onPressOut: () => {
      scale.set(withTiming(1, { duration: duration.fast }));
    },
  };
}
