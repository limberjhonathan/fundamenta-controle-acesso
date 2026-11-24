import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariant } from '@/shared/theme';

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
};

/**
 * Texto tipográfico do design system. Garante que todo texto use as fontes
 * e escalas da marca, evitando estilos soltos pelas telas.
 */
export function AppText({ variant = 'body', color = colors.text, align, style, ...rest }: Props) {
  return <Text {...rest} style={[typography[variant], { color }, align && { textAlign: align }, style]} />;
}
