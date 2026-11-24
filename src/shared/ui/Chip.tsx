import { StyleSheet, View } from 'react-native';

import { brand, colors, palette, radius, spacing } from '@/shared/theme';

import { AppText } from './AppText';

type Tone = 'accent' | 'neutral' | 'glass';

const TONES: Record<Tone, { background: string; text: string; border?: string }> = {
  accent: { background: brand.lime, text: brand.dark },
  neutral: { background: palette.primary[50], text: palette.primary[700] },
  glass: { background: colors.overlayGlass, text: colors.textOnDark, border: colors.overlayGlassBorder },
};

type Props = {
  label: string;
  tone?: Tone;
};

/** Etiqueta curta (ex.: "Você", contador de usuários). */
export function Chip({ label, tone = 'neutral' }: Props) {
  const look = TONES[tone];
  return (
    <View style={[styles.chip, { backgroundColor: look.background }, look.border && { borderWidth: 1, borderColor: look.border }]}>
      <AppText variant="captionStrong" color={look.text}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xxs + 1,
    borderRadius: radius.pill,
  },
});
