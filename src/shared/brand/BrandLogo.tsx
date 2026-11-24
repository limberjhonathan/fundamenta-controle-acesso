import { StyleSheet, View } from 'react-native';

import { BrandSymbol, type BrandTone } from './BrandSymbol';
import { BrandWordmark } from './BrandWordmark';
import { LOCKUP } from './paths';

type Props = {
  /** Altura do símbolo; a palavra acompanha a proporção oficial do Figma. */
  size?: number;
  tone?: 'light' | 'dark';
  symbolTone?: BrandTone;
  showWordmark?: boolean;
};

/** Logo horizontal (símbolo + palavra), estático. */
export function BrandLogo({ size = 32, tone = 'light', symbolTone, showWordmark = true }: Props) {
  return (
    <View style={[styles.row, { gap: size * LOCKUP.gapRatio }]} accessibilityRole="image" accessibilityLabel="Fundamenta">
      <BrandSymbol size={size} tone={symbolTone ?? tone} />
      {showWordmark && <BrandWordmark height={size * LOCKUP.wordmarkHeightRatio} tone={tone} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
