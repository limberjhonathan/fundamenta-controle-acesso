import { useId } from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { brand } from '@/shared/theme';

import { SYMBOL_PATH, SYMBOL_VIEWBOX } from './paths';

export type BrandTone = 'light' | 'dark' | 'gradient';

type Props = {
  /** Altura em px; a largura segue a proporção oficial do símbolo. */
  size?: number;
  tone?: BrandTone;
};

const SOLID_FILL: Record<Exclude<BrandTone, 'gradient'>, string> = {
  light: brand.light,
  dark: brand.dark,
};

/** Símbolo da marca Fundamenta (o "F" em blocos), em vetor. */
export function BrandSymbol({ size = 48, tone = 'light' }: Props) {
  const gradientId = `fundamenta-symbol-${useId()}`;
  const width = (size * SYMBOL_VIEWBOX.width) / SYMBOL_VIEWBOX.height;

  return (
    <Svg
      width={width}
      height={size}
      viewBox={`0 0 ${SYMBOL_VIEWBOX.width} ${SYMBOL_VIEWBOX.height}`}
      accessibilityRole="image"
      accessibilityLabel="Símbolo Fundamenta"
    >
      {tone === 'gradient' && (
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={brand.symbolGradient[0]} />
            <Stop offset="1" stopColor={brand.symbolGradient[1]} />
          </LinearGradient>
        </Defs>
      )}
      <Path d={SYMBOL_PATH} fill={tone === 'gradient' ? `url(#${gradientId})` : SOLID_FILL[tone]} />
    </Svg>
  );
}
