import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { enter, exit, usePressScale } from '@/shared/animations';
import { colors, radius, shadows, spacing } from '@/shared/theme';
import { AppText, Avatar, Chip } from '@/shared/ui';

import type { PublicUser } from '../domain/user';

type Props = {
  user: PublicUser;
  isCurrentUser: boolean;
  onPress: (user: PublicUser) => void;
  onLongPress: (user: PublicUser) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Card da listagem: avatar, nome e login (como no mockup). */
export const UserCard = memo(function UserCard({ user, isCurrentUser, onPress, onLongPress }: Props) {
  const press = usePressScale();

  return (
    <Animated.View entering={enter} exiting={exit}>
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={`${user.name}, login ${user.login}${isCurrentUser ? ', você' : ''}`}
        accessibilityHint="Toque para editar. Toque e segure para excluir."
        onPress={() => onPress(user)}
        onLongPress={() => onLongPress(user)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[styles.card, press.animatedStyle]}
      >
        <Avatar name={user.name} />

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <AppText variant="title" numberOfLines={1} style={styles.name}>
              {user.name}
            </AppText>
            {isCurrentUser && <Chip label="Você" tone="accent" />}
          </View>
          <AppText variant="caption" color={colors.textMuted} numberOfLines={1}>
            @{user.login}
          </AppText>
        </View>

        <MaterialIcons name="chevron-right" size={22} color={colors.placeholder} />
      </AnimatedPressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  info: {
    flex: 1,
    gap: spacing.xxs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    flexShrink: 1,
  },
});
