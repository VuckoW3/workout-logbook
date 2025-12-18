// Ported from web - UI primitive
import React from 'react';
import { Text, View, StyleSheet, ViewProps } from 'react-native';

type Variant = 'default' | 'secondary' | 'outline' | 'destructive';

interface BadgeProps extends ViewProps {
  variant?: Variant;
  children?: React.ReactNode;
}

export function Badge({ variant = 'default', children, style, ...props }: BadgeProps) {
  return (
    <View {...props} style={[styles.base, variantStyles[variant], style]}>
      {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

const variantStyles: Record<Variant, any> = {
  default: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' },
  secondary: { backgroundColor: '#e5e7eb', borderColor: '#d1d5db' },
  outline: { backgroundColor: 'transparent', borderColor: '#d1d5db' },
  destructive: { backgroundColor: '#fee2e2', borderColor: '#fca5a5' },
};
