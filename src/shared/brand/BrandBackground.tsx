import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { brand } from '@/shared/theme';

const SHAPES = require('../../../assets/brand/background-shapes.jpg');

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Alinhamento do recorte da arte (topo para cabeçalhos, centro para telas cheias). */
  position?: 'top' | 'center';
};

/**
 * Fundo institucional: arte de formas verdes da marca sobre o verde-escuro,
 * com um degradê para garantir contraste do conteúdo por cima.
 */
export function BrandBackground({ children, style, position = 'center' }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Image source={SHAPES} style={StyleSheet.absoluteFill} contentFit="cover" contentPosition={position} />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(20,35,31,0.15)', 'rgba(20,35,31,0.55)']}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: brand.dark,
    overflow: 'hidden',
  },
});
