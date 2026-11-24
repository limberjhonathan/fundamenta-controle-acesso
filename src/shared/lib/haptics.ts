import * as Haptics from 'expo-haptics';

/**
 * Vibração curta de feedback. Isolada aqui para que as telas não dependam da
 * biblioteca diretamente; falhas (ex.: aparelho sem motor) são ignoradas.
 */
const ignore = () => undefined;

export const haptics = {
  tap: () => void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(ignore),
  selection: () => void Haptics.selectionAsync().catch(ignore),
  success: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(ignore),
  warning: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(ignore),
  error: () => void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(ignore),
};
