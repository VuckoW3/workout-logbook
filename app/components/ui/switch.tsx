// Ported from web - UI primitive
import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

interface SwitchProps {
  value?: boolean;
  defaultChecked?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
}

export function Switch({ value, defaultChecked = false, onValueChange, disabled }: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const current = value ?? internal;

  const toggle = () => {
    const next = !current;
    setInternal(next);
    onValueChange?.(next);
  };

  return (
    <Pressable onPress={toggle} disabled={disabled} style={[styles.track, current ? styles.trackOn : null, disabled ? styles.disabled : null]}>
      <View style={[styles.thumb, current ? styles.thumbOn : null]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#e5e7eb',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  trackOn: {
    backgroundColor: '#111827',
    alignItems: 'flex-end',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  thumbOn: {
    backgroundColor: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
});
