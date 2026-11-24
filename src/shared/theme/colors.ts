/**
 * Identidade visual Fundamenta (mesma paleta do sistema web).
 * Paleta oficial: #14231F (verde-escuro), #16A878 (verde), #B8F36B (lima), #F3F7F4 (gelo).
 */
export const brand = {
  dark: '#14231F',
  green: '#16A878',
  lime: '#B8F36B',
  light: '#F3F7F4',
  /** Gradiente do ícone do app (lima → verde-água). */
  gradient: ['#B8F36B', '#56D9AE'] as const,
  /** Gradiente do símbolo (verde-claro → verde). */
  symbolGradient: ['#B0F1AF', '#24BA95'] as const,
} as const;

export const palette = {
  primary: {
    950: '#0C1613',
    900: brand.dark,
    800: '#1B3A30',
    700: '#0D6E50',
    600: '#0F8A62',
    500: brand.green,
    100: '#D3F1E3',
    50: '#EAF7F0',
  },
  gray: {
    900: '#14231F',
    700: '#33423D',
    600: '#4A5853',
    500: '#66736E',
    400: '#9AA5A0',
    300: '#CFD8D3',
    200: '#E1E8E4',
    100: '#EDF2EF',
    50: brand.light,
  },
  red: { 600: '#B91C1C', 500: '#EF4444', 50: '#FEE2E2' },
  orange: { 500: '#F59E0B' },
  white: '#FFFFFF',
  black: '#000000',
} as const;

/** Cores semânticas: as telas usam estas, nunca a paleta crua. */
export const colors = {
  background: palette.gray[50],
  surface: palette.white,
  surfaceMuted: palette.gray[100],

  text: palette.gray[900],
  textSecondary: palette.gray[600],
  textMuted: palette.gray[500],
  textOnDark: brand.light,
  textOnDarkMuted: 'rgba(243, 247, 244, 0.72)',
  textOnBrand: brand.dark,

  primary: palette.primary[600],
  primaryPressed: palette.primary[700],
  primarySoft: palette.primary[50],
  onPrimary: palette.white,

  accent: brand.lime,
  headerBackground: brand.dark,

  border: palette.gray[200],
  borderStrong: palette.gray[300],
  borderFocus: palette.primary[500],
  placeholder: palette.gray[400],
  icon: palette.gray[500],

  danger: palette.red[500],
  dangerStrong: palette.red[600],
  dangerSoft: palette.red[50],
  warning: palette.orange[500],
  success: brand.green,

  overlayGlass: 'rgba(243, 247, 244, 0.12)',
  overlayGlassBorder: 'rgba(243, 247, 244, 0.18)',
  scrim: 'rgba(12, 22, 19, 0.45)',
} as const;
