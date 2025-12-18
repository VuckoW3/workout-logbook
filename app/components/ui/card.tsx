// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

export function Card({ style, children, ...props }: ViewProps) {
  return (
    <View {...props} style={[styles.card, style]}>
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children?: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

export function CardTitle({ children }: { children?: React.ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.title}>{children}</Text> : <>{children}</>;
}

export function CardDescription({ children }: { children?: React.ReactNode }) {
  return typeof children === 'string' ? <Text style={styles.description}>{children}</Text> : <>{children}</>;
}

export function CardContent({ children }: { children?: React.ReactNode }) {
  return <View style={styles.content}>{children}</View>;
}

export function CardFooter({ children }: { children?: React.ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    marginTop: 8,
    marginBottom: 8,
  },
  footer: {
    marginTop: 8,
  },
});
