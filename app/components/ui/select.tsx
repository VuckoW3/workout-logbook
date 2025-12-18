// Ported from web - UI primitive
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const Select = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const SelectTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.trigger}>
    {children}
  </Pressable>
);
export const SelectContent = ({ children }: { children?: React.ReactNode }) => <View style={styles.content}>{children}</View>;
export const SelectItem = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.item}>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </Pressable>
);
export const SelectValue = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text>{children}</Text> : <>{children}</>;
export const SelectGroup = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const SelectLabel = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.label}>{children}</Text> : <>{children}</>;

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  content: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#6b7280',
    fontWeight: '600',
  },
});
