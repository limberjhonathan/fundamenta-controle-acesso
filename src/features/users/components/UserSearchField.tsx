import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { colors, fonts, radius, spacing } from '@/shared/theme';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/** Busca "de vidro" para o cabeçalho escuro da listagem. */
export function UserSearchField({ value, onChange }: Props) {
  return (
    <View style={styles.field}>
      <MaterialIcons name="search" size={20} color={colors.textOnDarkMuted} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Buscar por nome ou login"
        placeholderTextColor={colors.textOnDarkMuted}
        selectionColor={colors.accent}
        cursorColor={colors.accent}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Buscar usuários"
        style={styles.input}
      />
      {value.length > 0 && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <Pressable accessibilityRole="button" accessibilityLabel="Limpar busca" hitSlop={10} onPress={() => onChange('')}>
            <MaterialIcons name="close" size={18} color={colors.textOnDark} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 46,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.overlayGlass,
    borderWidth: 1,
    borderColor: colors.overlayGlassBorder,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDark,
    paddingVertical: 0,
  },
});
