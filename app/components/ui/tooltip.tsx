// Ported from web - UI primitive
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TooltipProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const Tooltip = ({ children }: { children: ReactNode }) => <>{children}</>;

export const TooltipTrigger = ({ children }: { children: ReactNode }) => <>{children}</>;

interface TooltipContentProps {
  children: ReactNode;
}

export const TooltipContent = ({ children }: TooltipContentProps) => {
  return (
    <View style={styles.container}>
      {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
