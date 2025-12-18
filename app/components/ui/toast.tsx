// Ported from web - UI primitive
import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export type ToastRecord = {
  id: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  duration?: number;
  variant?: 'default' | 'destructive';
};

type Listener = (toasts: ToastRecord[]) => void;

let toastStore: ToastRecord[] = [];
let listeners: Listener[] = [];

function notify() {
  listeners.forEach((listener) => listener([...toastStore]));
}

export function toast(data: Omit<ToastRecord, 'id'> & { id?: string }) {
  const record: ToastRecord = { id: data.id ?? Date.now().toString(), ...data };
  toastStore = [...toastStore, record];
  notify();
  if (record.duration && record.duration > 0) {
    setTimeout(() => {
      toastStore = toastStore.filter((item) => item.id !== record.id);
      notify();
    }, record.duration);
  }
  return record;
}

export function dismiss(id?: string) {
  if (id) {
    toastStore = toastStore.filter((item) => item.id !== id);
  } else {
    toastStore = [];
  }
  notify();
}

export function useToastController() {
  const [toasts, setToasts] = useState<ToastRecord[]>(toastStore);

  useEffect(() => {
    const listener: Listener = (items) => setToasts(items);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return { toasts, toast, dismiss };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ToastViewport({ children }: { children?: ReactNode }) {
  return <View style={styles.viewport}>{children}</View>;
}

interface ToastProps {
  children: ReactNode;
  variant?: 'default' | 'destructive';
  onPress?: () => void;
}

export function Toast({ children, variant = 'default', onPress }: ToastProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.toast,
        variant === 'destructive' ? styles.toastDestructive : null,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function ToastTitle({ children }: { children?: ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.title}>{children}</Text> : <>{children}</>;
}

export function ToastDescription({ children }: { children?: ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.description}>{children}</Text> : <>{children}</>;
}

export function ToastAction({ children, onPress }: { children?: ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.action}>
      {typeof children === 'string' ? <Text style={styles.actionText}>{children}</Text> : children}
    </Pressable>
  );
}

export function ToastClose({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.close}>
      <Text style={styles.closeText}>X</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    padding: 16,
    flexDirection: 'column',
  },
  toast: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toastDestructive: {
    backgroundColor: '#fee2e2',
    borderColor: '#fca5a5',
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111827',
  },
  description: {
    fontSize: 13,
    color: '#374151',
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#111827',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  close: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  closeText: {
    fontSize: 18,
    color: '#6b7280',
  },
});
