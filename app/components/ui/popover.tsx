// Ported from web - UI primitive
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Popover = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const PopoverTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <View onTouchStart={onPress}>{children}</View>
);
export const PopoverContent = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.content}>{children}</View>
);

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
});
