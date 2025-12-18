// Ported from web - UI primitive
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const DropdownMenu = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const DropdownMenuTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress}>{children}</Pressable>
);
export const DropdownMenuContent = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.content}>{children}</View>
);
export const DropdownMenuLabel = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.label}>{children}</Text> : <>{children}</>;
export const DropdownMenuItem = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.item}>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </Pressable>
);
export const DropdownMenuSeparator = () => <View style={styles.separator} />;
export const DropdownMenuCheckboxItem = DropdownMenuItem;
export const DropdownMenuRadioItem = DropdownMenuItem;
export const DropdownMenuGroup = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const DropdownMenuPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const DropdownMenuSub = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const DropdownMenuSubTrigger = DropdownMenuTrigger;
export const DropdownMenuSubContent = DropdownMenuContent;

const styles = StyleSheet.create({
  content: {
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 4,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#6b7280',
    fontWeight: '600',
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});
