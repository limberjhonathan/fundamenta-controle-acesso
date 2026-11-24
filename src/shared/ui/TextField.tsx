import { useState, type ComponentProps, type Ref } from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextInputInstance, type TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { enterFast, exit } from '@/shared/animations';
import { colors, duration, fonts, radius, sizes, spacing } from '@/shared/theme';

import { AppText } from './AppText';
import { useKeyboardReveal } from './KeyboardAwareScroll';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type Props = Omit<TextInputProps, 'style'> & {
  label: string;
  icon?: IconName;
  error?: string;
  /** Texto de ajuda exibido quando não há erro. */
  hint?: string;
  ref?: Ref<TextInputInstance>;
};

/**
 * Campo de texto do design system:
 * - rótulo em caixa alta e ícone à esquerda (padrão do sistema web);
 * - borda e ícone mudam de cor com animação ao focar;
 * - mensagem de erro aparece com um fade curto;
 * - campos de senha ganham o botão de mostrar/ocultar automaticamente.
 */
export function TextField({ label, icon, error, hint, ref, secureTextEntry, onFocus, onBlur, ...inputProps }: Props) {
  const [hidden, setHidden] = useState(true);
  const focus = useSharedValue(0);
  const revealFocusedInput = useKeyboardReveal();

  const fieldStyle = useAnimatedStyle(() => ({
    borderColor: error ? colors.danger : interpolateColor(focus.value, [0, 1], [colors.border, colors.borderFocus]),
    borderWidth: 1,
  }));

  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.container}>
      <AppText variant="label" color={error ? colors.danger : colors.textSecondary} style={styles.label}>
        {label}
      </AppText>

      <Animated.View style={[styles.field, fieldStyle]}>
        {icon && <MaterialIcons name={icon} size={sizes.icon} color={error ? colors.danger : colors.icon} />}

        <TextInput
          ref={ref}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          autoCorrect={false}
          secureTextEntry={isPassword && hidden}
          style={styles.input}
          onFocus={(e) => {
            focus.set(withTiming(1, { duration: duration.fast }));
            // Trocando de campo com o teclado já aberto: garante que o novo campo fique visível.
            revealFocusedInput?.();
            onFocus?.(e);
          }}
          onBlur={(e) => {
            focus.set(withTiming(0, { duration: duration.base }));
            onBlur?.(e);
          }}
          {...inputProps}
        />

        {isPassword && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar senha' : 'Ocultar senha'}
            hitSlop={10}
            onPress={() => setHidden((v) => !v)}
          >
            <MaterialIcons name={hidden ? 'visibility' : 'visibility-off'} size={sizes.icon} color={colors.icon} />
          </Pressable>
        )}
      </Animated.View>

      {error ? (
        <Animated.View entering={enterFast} exiting={exit} style={styles.messageRow}>
          <MaterialIcons name="error-outline" size={14} color={colors.danger} />
          <AppText variant="caption" color={colors.danger} style={styles.message}>
            {error}
          </AppText>
        </Animated.View>
      ) : (
        !!hint && (
          <AppText variant="caption" color={colors.textMuted} style={styles.hint}>
            {hint}
          </AppText>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: sizes.control,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    paddingVertical: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  message: {
    flex: 1,
  },
  hint: {
    marginTop: spacing.xs,
  },
});
