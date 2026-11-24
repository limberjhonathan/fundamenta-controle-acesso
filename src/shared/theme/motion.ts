import { Easing } from 'react-native-reanimated';

/**
 * Linguagem de movimento do app: discreta e funcional.
 * Transições curtas, sem "quiques" nem animações contínuas — o movimento
 * só existe para indicar mudança de estado.
 */
export const duration = {
  fast: 150,
  base: 220,
  slow: 300,
} as const;

export const easing = {
  standard: Easing.bezier(0.2, 0, 0, 1),
  inOut: Easing.inOut(Easing.quad),
} as const;
