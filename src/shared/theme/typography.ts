import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import type { TextStyle } from 'react-native';

/**
 * Tipografia Fundamenta: Inter para textos e Space Grotesk para títulos/slogan
 * (as mesmas fontes do sistema web).
 *
 * No Android, fonte customizada não aceita `fontWeight`: cada peso é uma família.
 */
export const fontAssets = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
};

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
  display: 'SpaceGrotesk_700Bold',
} as const;

export const typography = {
  display: { fontFamily: fonts.display, fontSize: 30, lineHeight: 36, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.display, fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.display, fontSize: 20, lineHeight: 26 },
  title: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 22 },
  button: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20, letterSpacing: 0.2 },
  label: { fontFamily: fonts.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.8, textTransform: 'uppercase' },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16 },
  captionStrong: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16 },
  overline: { fontFamily: fonts.displayMedium, fontSize: 12, lineHeight: 16, letterSpacing: 1.6, textTransform: 'uppercase' },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
