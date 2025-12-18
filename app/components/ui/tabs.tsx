// Ported from web - UI primitive
import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const Tabs = ({ defaultValue, value, onValueChange, children }: TabsProps) => {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  return (
    <TabsContext.Provider value={{ current, setValue: (v) => { setInternal(v); onValueChange?.(v); } }}>
      <View>{children}</View>
    </TabsContext.Provider>
  );
};

type TabsContextValue = { current?: string; setValue: (value: string) => void };
const TabsContext = React.createContext<TabsContextValue | null>(null);

export const TabsList = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.list}>{children}</View>;
};

interface TabsTriggerProps {
  value: string;
  children?: React.ReactNode;
}

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const ctx = React.useContext(TabsContext);
  const active = ctx?.current === value;
  return (
    <Pressable
      onPress={() => ctx?.setValue(value)}
      style={[styles.trigger, active ? styles.triggerActive : null]}
    >
      {typeof children === 'string' ? <Text style={[styles.triggerText, active ? styles.triggerTextActive : null]}>{children}</Text> : children}
    </Pressable>
  );
};

export const TabsContent = ({ value, children }: { value: string; children?: React.ReactNode }) => {
  const ctx = React.useContext(TabsContext);
  if (ctx?.current !== value) return null;
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    padding: 4,
  },
  trigger: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  triggerActive: {
    backgroundColor: '#fff',
  },
  triggerText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  triggerTextActive: {
    color: '#111827',
  },
  content: {
    paddingTop: 12,
  },
});
