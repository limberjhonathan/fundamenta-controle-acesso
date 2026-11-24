import { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { duration, easing } from '@/shared/theme';

/**
 * Animações de entrada/saída padronizadas. Todas as telas usam estes presets,
 * garantindo o mesmo comportamento sutil em todo o app.
 */
export const enter = FadeIn.duration(duration.slow).easing(easing.standard);
export const enterFast = FadeIn.duration(duration.fast);
export const exit = FadeOut.duration(duration.fast);
export const layoutChange = LinearTransition.duration(duration.base).easing(easing.standard);
