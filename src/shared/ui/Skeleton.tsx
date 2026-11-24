import { useEffect } from 'react';
import { type DimensionValue, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { colors, easing, radius } from '@/shared/theme';

type Props = {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
};

/** Bloco "pulsante" que ocupa o lugar do conteúdo enquanto ele carrega. */
export function Skeleton({ width = '100%', height = 14, borderRadius = radius.sm }: Props) {
  const pulse = useSharedValue(0.5);

  useEffect(() => {
    pulse.set(withRepeat(withTiming(1, { duration: 800, easing: easing.inOut }), -1, true));
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return <Animated.View style={[styles.block, { width, height, borderRadius }, animatedStyle]} />;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.surfaceMuted,
  },
});
