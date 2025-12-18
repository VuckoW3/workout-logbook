// Ported from web - UI primitive
import React from 'react';
import { Image, ImageProps, Text, View, StyleSheet } from 'react-native';

export function Avatar({ children, style }: { children?: React.ReactNode; style?: any }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export function AvatarImage(props: ImageProps) {
  return <Image {...props} style={[styles.image, props.style]} />;
}

export function AvatarFallback({ children }: { children?: React.ReactNode }) {
  return (
    <View style={[styles.image, styles.fallback]}>
      {typeof children === 'string' ? <Text style={styles.fallbackText}>{children}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#374151',
    fontWeight: '700',
  },
});
