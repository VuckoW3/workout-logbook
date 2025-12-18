// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

type Variant = 'default' | 'destructive';

interface AlertProps extends ViewProps {
  variant?: Variant;
}

export function Alert({ children, style, variant = 'default', ...props }: AlertProps) {
  return (
    <View {...props} style={[styles.base, variant === 'destructive' ? styles.destructive : null, style]}>
      {children}
    </View>
  );
}

export function AlertTitle({ children }: { children?: React.ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.title}>{children}</Text> : <>{children}</>;
}

export function AlertDescription({ children }: { children?: React.ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.description}>{children}</Text> : <>{children}</>;
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 12,
  },
  destructive: {
    borderColor: '#fca5a5',
    backgroundColor: '#fee2e2',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    color: '#374151',
    fontSize: 14,
  },
});
