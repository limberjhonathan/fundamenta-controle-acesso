import { create } from 'zustand';

import { haptics } from '@/shared/lib/haptics';

export type ToastTone = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastState {
  current: ToastMessage | null;
  show: (message: string, tone?: ToastTone) => void;
  dismiss: () => void;
}

const VISIBLE_MS = 2800;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
let nextId = 1;

/**
 * Fila simples de notificações rápidas (toast). Qualquer parte do app chama
 * `toast.success(...)`; o `ToastHost` na raiz cuida de exibir e animar.
 */
export const useToastStore = create<ToastState>((set) => ({
  current: null,

  show(message, tone = 'info') {
    clearTimeout(hideTimer);
    set({ current: { id: nextId++, message, tone } });
    hideTimer = setTimeout(() => set({ current: null }), VISIBLE_MS);
  },

  dismiss() {
    clearTimeout(hideTimer);
    set({ current: null });
  },
}));

export const toast = {
  success(message: string) {
    haptics.success();
    useToastStore.getState().show(message, 'success');
  },
  error(message: string) {
    haptics.error();
    useToastStore.getState().show(message, 'error');
  },
  info(message: string) {
    useToastStore.getState().show(message, 'info');
  },
};
