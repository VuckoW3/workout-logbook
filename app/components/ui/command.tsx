// Ported from web - UI primitive
import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewProps, TextInputProps, Pressable } from 'react-native';

export const Command = ({ children, style }: ViewProps) => <View style={style}>{children}</View>;

export const CommandDialog = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;

export const CommandInput = ({ style, ...props }: TextInputProps) => (
  <View style={styles.inputWrapper}>
    <TextInput {...props} style={[styles.input, style]} placeholderTextColor="#9ca3af" />
  </View>
);

export const CommandList = ({ children, style }: ViewProps) => <View style={style}>{children}</View>;
export const CommandEmpty = ({ children }: { children?: React.ReactNode }) => (
  <Text style={styles.empty}>{children}</Text>
);
export const CommandGroup = ({ children, style }: ViewProps) => <View style={[styles.group, style]}>{children}</View>;
export const CommandSeparator = ({ style }: ViewProps) => <View style={[styles.separator, style]} />;
export const CommandItem = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.item}>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </Pressable>
);
export const CommandShortcut = ({ children }: { children?: React.ReactNode }) => (
  <Text style={styles.shortcut}>{children}</Text>
);

const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 12,
    color: '#6b7280',
  },
  group: {
    padding: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#9ca3af',
  },
});
