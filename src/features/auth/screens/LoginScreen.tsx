import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DEFAULT_ADMIN } from '@/features/users/services/userService';
import { enter } from '@/shared/animations';
import { BrandBackground } from '@/shared/brand';
import { colors, radius, shadows, spacing } from '@/shared/theme';
import { AppText, KeyboardAwareScroll } from '@/shared/ui';

import { LoginForm } from '../components/LoginForm';
import { LoginHero } from '../components/LoginHero';
import { useLoginForm } from '../hooks/useLoginForm';

/**
 * Tela 1 — Acesso.
 * Fundo com a arte da marca, logo no topo e o formulário em um painel claro
 * (mesmo layout da versão mobile do sistema web).
 */
export function LoginScreen() {
  const router = useRouter();
  const form = useLoginForm();
  const insets = useSafeAreaInsets();

  return (
    <BrandBackground style={styles.flex}>
      <KeyboardAwareScroll>
        <View style={[styles.hero, { paddingTop: insets.top + spacing.xxl }]}>
          <LoginHero />
        </View>

        <Animated.View entering={enter} style={[styles.sheet, { paddingBottom: insets.bottom + spacing.xl }]}>
          <LoginForm form={form} onCreateAccount={() => router.push('/register')} />

          <View style={styles.footer}>
            <AppText variant="caption" color={colors.textMuted} align="center">
              Primeiro acesso: login <AppText variant="captionStrong">{DEFAULT_ADMIN.login}</AppText> e senha{' '}
              <AppText variant="captionStrong">{DEFAULT_ADMIN.password}</AppText>
            </AppText>
            <AppText variant="caption" color={colors.textMuted} align="center">
              © {new Date().getFullYear()} Fundamenta · Controle de Acesso
            </AppText>
          </View>
        </Animated.View>
      </KeyboardAwareScroll>
    </BrandBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  hero: {
    flexGrow: 1,
    minHeight: 260,
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    ...shadows.floating,
  },
  footer: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderStrong,
    gap: spacing.xs,
  },
});
