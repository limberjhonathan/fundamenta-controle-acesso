import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, palette, sizes } from '@/shared/theme';

import { AppText } from './AppText';

type AvatarLook = { colors: readonly [string, string]; text: string };

/** Degradês dentro da paleta da marca, cada um com a cor de texto de melhor contraste. */
const LOOKS: readonly AvatarLook[] = [
  { colors: ['#B8F36B', '#56D9AE'], text: palette.primary[900] },
  { colors: ['#56D9AE', '#16A878'], text: palette.primary[900] },
  { colors: ['#16A878', '#0D6E50'], text: colors.textOnDark },
  { colors: ['#0F8A62', '#1B3A30'], text: colors.textOnDark },
  { colors: ['#B0F1AF', '#24BA95'], text: palette.primary[900] },
];

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase() || '?';
}

/** O mesmo nome sempre recebe o mesmo degradê (hash simples e estável). */
function pickLook(seed: string): AvatarLook {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return LOOKS[hash % LOOKS.length] ?? LOOKS[0]!;
}

type Props = {
  name: string;
  size?: number;
};

/** Avatar com as iniciais do nome sobre um degradê da marca. */
export function Avatar({ name, size = sizes.avatar }: Props) {
  const look = pickLook(name.trim().toLowerCase());

  return (
    <LinearGradient
      colors={look.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size * 0.32 }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <AppText variant="bodyStrong" color={look.text} style={{ fontSize: size * 0.36, lineHeight: size * 0.44 }}>
        {getInitials(name)}
      </AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
