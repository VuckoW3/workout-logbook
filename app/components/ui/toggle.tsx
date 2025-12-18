// Ported from web - UI primitive
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewProps } from 'react-native';

type Variant = 'default' | 'outline';

interface ToggleProps extends ViewProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: Variant;
  children?: React.ReactNode;
}

export function Toggle({ pressed, defaultPressed = false, onPressedChange, variant = 'default', children, style }: ToggleProps) {
  const [internal, setInternal] = useState(defaultPressed);
  const active = pressed ?? internal;

  const toggle = () => {
    const next = !active;
    setInternal(next);
    onPressedChange?.(next);
  };

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.base,
        variant === 'outline' ? styles.outline : styles.filled,
        active ? styles.active : null,
        style,
      ]}
    >
      {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filled: {
    backgroundColor: '#f3f4f6',
  },
  active: {
    backgroundColor: '#111827',
  },
  text: {
    color: '#111827',
    fontWeight: '600',
  },
});
