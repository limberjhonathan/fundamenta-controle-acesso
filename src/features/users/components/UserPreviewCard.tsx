import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/shared/theme';
import { AppText, Avatar } from '@/shared/ui';

type Props = {
  name: string;
  login: string;
};

/** Prévia do usuário que se atualiza ao vivo conforme o formulário é preenchido. */
export function UserPreviewCard({ name, login }: Props) {
  const displayName = name.trim() || 'Nome do usuário';
  const displayLogin = login.trim() || 'login';

  return (
    <View style={styles.card}>
      <Avatar name={name.trim() || '?'} size={52} />
      <View style={styles.info}>
        <AppText variant="title" color={colors.textOnDark} numberOfLines={1}>
          {displayName}
        </AppText>
        <AppText variant="caption" color={colors.textOnDarkMuted} numberOfLines={1}>
          @{displayLogin}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.overlayGlass,
    borderWidth: 1,
    borderColor: colors.overlayGlassBorder,
  },
  info: {
    flex: 1,
  },
});
