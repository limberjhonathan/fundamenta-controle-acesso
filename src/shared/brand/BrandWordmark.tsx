import Svg, { Path } from 'react-native-svg';

import { brand } from '@/shared/theme';

import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from './paths';

type Props = {
  /** Altura em px; a largura segue a proporção oficial. */
  height?: number;
  tone?: 'light' | 'dark';
};

/** Palavra "FUNDAMENTA" no lettering oficial da marca. */
export function BrandWordmark({ height = 20, tone = 'light' }: Props) {
  const width = (height * WORDMARK_VIEWBOX.width) / WORDMARK_VIEWBOX.height;
  const fill = tone === 'light' ? brand.light : brand.dark;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      accessibilityRole="image"
      accessibilityLabel="Fundamenta"
    >
      {WORDMARK_PATHS.map((d) => (
        <Path key={d} d={d} fill={fill} />
      ))}
    </Svg>
  );
}
