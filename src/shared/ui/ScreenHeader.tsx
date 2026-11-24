import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandBackground, BrandSymbol } from '@/shared/brand';
import { colors, radius, spacing } from '@/shared/theme';

import { AppText } from './AppText';
import { IconButton } from './IconButton';

type Props = {
  title: string;
  /** Linha pequena acima do título (ex.: "Controle de acesso"). */
  eyebrow?: string;
  subtitle?: string;
  /** Exibe o botão de voltar à esquerda. */
  onBack?: () => void;
  /** Botões de ação à direita (ex.: sair, adicionar). */
  actions?: ReactNode;
  /** Conteúdo extra no rodapé do cabeçalho (ex.: busca, resumo). */
  children?: ReactNode;
};

/**
 * Cabeçalho institucional das telas internas: arte da marca ao fundo,
 * cantos inferiores arredondados e título.
 * Substitui o cabeçalho nativo mantendo a mesma estrutura do mockup
 * (título + ações à direita).
 */
export function ScreenHeader({ title, eyebrow, subtitle, onBack, actions, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <BrandBackground position="top" style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.topBar}>
        {onBack ? (
          <IconButton icon="arrow-back" label="Voltar" onPress={onBack} />
        ) : (
          <View style={styles.logoMark}>
            <BrandSymbol size={26} tone="gradient" />
          </View>
        )}
        <View style={styles.actions}>{actions}</View>
      </View>

      <View style={styles.titleBlock}>
        {!!eyebrow && (
          <AppText variant="overline" color={colors.accent}>
            {eyebrow}
          </AppText>
        )}
        <AppText variant="h1" color={colors.textOnDark} accessibilityRole="header">
          {title}
        </AppText>
        {!!subtitle && (
          <AppText variant="body" color={colors.textOnDarkMuted}>
            {subtitle}
          </AppText>
        )}
      </View>

      {children}
    </BrandBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.sheet,
    borderBottomRightRadius: radius.sheet,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  logoMark: {
    paddingVertical: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  titleBlock: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
});
