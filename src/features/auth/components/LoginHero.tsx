import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { enter } from '@/shared/animations';
import { BrandLogo } from '@/shared/brand';
import { brand, spacing } from '@/shared/theme';
import { AppText } from '@/shared/ui';

/** Topo da tela de login: logo e slogan da marca. */
export function LoginHero() {
  return (
    <Animated.View entering={enter} style={styles.container}>
      <BrandLogo size={48} symbolTone="gradient" />
      <AppText variant="overline" color={brand.light} align="center" style={styles.slogan}>
        Processos conectados, resultados reais.
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  slogan: {
    opacity: 0.85,
  },
});
