// Ported from web - UI primitive
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export function Sidebar({ children, style, ...props }: ViewProps) {
  return (
    <View {...props} style={[styles.sidebar, style]}>
      {children}
    </View>
  );
}

export function SidebarContent({ children }: { children?: React.ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

export function SidebarTrigger({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) {
  return <View onTouchStart={onPress}>{children}</View>;
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: '#f9fafb',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  content: {
    padding: 12,
  },
});
