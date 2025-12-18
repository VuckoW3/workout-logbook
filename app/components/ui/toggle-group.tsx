// Ported from web - UI primitive
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Toggle } from './toggle';

type ToggleGroupProps = {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
};

const ToggleGroupContext = React.createContext<{
  type: 'single' | 'multiple';
  value: string | string[] | undefined;
  setValue: (value: string) => void;
} | null>(null);

export function ToggleGroup({
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  children,
}: ToggleGroupProps) {
  const [internal, setInternal] = useState<string | string[] | undefined>(defaultValue);
  const current = value ?? internal;

  const setValue = (val: string) => {
    if (type === 'single') {
      setInternal(val);
      onValueChange?.(val);
    } else {
      const list = Array.isArray(current) ? [...current] : [];
      const exists = list.includes(val);
      const next = exists ? list.filter((v) => v !== val) : [...list, val];
      setInternal(next);
      onValueChange?.(next);
    }
  };

  return (
    <ToggleGroupContext.Provider value={{ type, value: current, setValue }}>
      <View style={styles.row}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

interface ToggleGroupItemProps {
  value: string;
  children?: React.ReactNode;
}

export function ToggleGroupItem({ value, children }: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext);
  const active =
    ctx?.type === 'multiple'
      ? Array.isArray(ctx.value) && ctx.value.includes(value)
      : ctx?.value === value;

  return (
    <Toggle
      pressed={active}
      onPressedChange={() => ctx?.setValue(value)}
      style={styles.item}
    >
      {children}
    </Toggle>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    marginRight: 8,
  },
});
