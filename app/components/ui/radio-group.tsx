// Ported from web - UI primitive
import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const RadioContext = React.createContext<{
  value?: string;
  setValue: (value: string) => void;
} | null>(null);

export function RadioGroup({ value, defaultValue, onValueChange, children }: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  return (
    <RadioContext.Provider
      value={{
        value: current,
        setValue: (val) => {
          setInternal(val);
          onValueChange?.(val);
        },
      }}
    >
      <View style={styles.group}>{children}</View>
    </RadioContext.Provider>
  );
}

export function RadioGroupItem({ value, label }: { value: string; label?: string }) {
  const ctx = React.useContext(RadioContext);
  const selected = ctx?.value === value;
  return (
    <Pressable onPress={() => ctx?.setValue(value)} style={styles.item}>
      <View style={[styles.circle, selected ? styles.circleSelected : null]} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9ca3af',
    marginRight: 8,
  },
  circleSelected: {
    borderColor: '#111827',
    backgroundColor: '#111827',
  },
  label: {
    color: '#111827',
  },
});
