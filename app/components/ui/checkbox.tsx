// Ported from web - UI primitive
import React, { useState } from 'react';
import { Pressable, View, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, defaultChecked = false, onCheckedChange, label, disabled }: CheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const value = checked ?? internal;

  const toggle = (event: GestureResponderEvent) => {
    const next = !value;
    setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <Pressable onPress={toggle} disabled={disabled} style={styles.row}>
      <View style={[styles.box, value ? styles.boxChecked : null, disabled ? styles.disabled : null]}>
        {value ? <Text style={styles.check}>✓</Text> : null}
      </View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  check: {
    color: '#fff',
    fontSize: 12,
  },
  label: {
    marginLeft: 8,
    color: '#111827',
  },
  disabled: {
    opacity: 0.5,
  },
});
