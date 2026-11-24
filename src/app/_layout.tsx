import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useSessionStore } from '@/features/auth/store/useSessionStore';
import { ToastHost } from '@/shared/feedback';
import { authSwitchOptions, stackScreenOptions } from '@/shared/navigation/stackOptions';
import { fontAssets } from '@/shared/theme';

// Mantém a splash nativa (símbolo da marca) até fontes e sessão estarem prontas.
void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 400, fade: true });

/**
 * Layout raiz:
 * - carrega as fontes da marca e restaura a sessão salva;
 * - protege as rotas: sem sessão só "login" e "register"; com sessão só o grupo "(app)";
 * - exibe o toast global acima de todas as telas.
 */
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const status = useSessionStore((s) => s.status);
  const bootstrap = useSessionStore((s) => s.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  // Se a fonte falhar, segue com a fonte do sistema em vez de travar na splash.
  const ready = (fontsLoaded || !!fontError) && status !== 'loading';

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  const isAuthenticated = status === 'authenticated';

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="login" options={authSwitchOptions} />
          <Stack.Screen name="register" />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" options={authSwitchOptions} />
        </Stack.Protected>
      </Stack>
      <ToastHost />
    </>
  );
}
