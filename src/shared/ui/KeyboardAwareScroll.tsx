import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type ScrollViewInstance,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = {
  children: ReactNode;
  /** Conteúdo fixo abaixo da rolagem (ex.: barra com botão Salvar), que sobe junto com o teclado. */
  footer?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

/** Espaço livre mantido entre o campo focado e o teclado (ou a barra fixa). */
const REVEAL_MARGIN = 24;

type KeyboardScrollContextValue = {
  /** Rola até o campo focado, se ele estiver escondido pelo teclado. */
  revealFocusedInput: () => void;
};

const KeyboardScrollContext = createContext<KeyboardScrollContextValue | null>(null);

/** Usado pelo TextField para pedir que o campo focado fique visível. */
export function useKeyboardReveal() {
  return useContext(KeyboardScrollContext)?.revealFocusedInput;
}

/**
 * Área rolável para formulários que mantém o campo focado sempre visível.
 *
 * - `KeyboardAvoidingView` com `padding` nas duas plataformas: no Android o app
 *   é edge-to-edge, então a janela não encolhe sozinha quando o teclado abre.
 * - Ao abrir o teclado (ou trocar de campo), mede a posição do campo focado e
 *   rola o suficiente para ele ficar acima do teclado e da barra fixa (footer).
 */
export function KeyboardAwareScroll({ children, footer, contentContainerStyle, style }: Props) {
  const scrollRef = useRef<ScrollViewInstance>(null);
  const scrollOffset = useRef(0);
  const keyboardTop = useRef<number | null>(null);
  const footerHeight = useRef(0);

  const revealFocusedInput = useCallback(() => {
    const top = keyboardTop.current;
    const input = TextInput.State.currentlyFocusedInput();
    if (top == null || !input) return;

    // Aguarda o layout aplicar o padding do teclado antes de medir.
    requestAnimationFrame(() => {
      input.measureInWindow((_x, y, _width, height) => {
        const visibleBottom = top - footerHeight.current - REVEAL_MARGIN;
        const inputBottom = y + height;
        if (inputBottom > visibleBottom) {
          scrollRef.current?.scrollTo({ y: scrollOffset.current + (inputBottom - visibleBottom), animated: true });
        }
      });
    });
  }, []);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      keyboardTop.current = e.endCoordinates.screenY;
      // No iOS o evento chega antes da animação do teclado terminar.
      setTimeout(revealFocusedInput, Platform.OS === 'ios' ? 250 : 0);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      keyboardTop.current = null;
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [revealFocusedInput]);

  const context = useMemo(() => ({ revealFocusedInput }), [revealFocusedInput]);

  return (
    <KeyboardScrollContext.Provider value={context}>
      <KeyboardAvoidingView style={[styles.flex, style]} behavior="padding">
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            scrollOffset.current = e.nativeEvent.contentOffset.y;
          }}
        >
          {children}
        </ScrollView>
        {footer && (
          <View
            onLayout={(e) => {
              footerHeight.current = e.nativeEvent.layout.height;
            }}
          >
            {footer}
          </View>
        )}
      </KeyboardAvoidingView>
    </KeyboardScrollContext.Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
