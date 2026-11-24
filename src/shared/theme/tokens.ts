import type { ViewStyle } from 'react-native';

import { palette } from './colors';

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  sheet: 28,
  pill: 999,
} as const;

/** Sombras com a cor da marca (mais naturais que preto puro). */
export const shadows = {
  card: {
    shadowColor: palette.primary[950],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  floating: {
    shadowColor: palette.primary[950],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: '#56D9AE',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
} as const satisfies Record<string, ViewStyle>;

export const sizes = {
  control: 52,
  iconButton: 40,
  avatar: 44,
  icon: 20,
} as const;
