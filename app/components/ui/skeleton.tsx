// Ported from web - UI primitive
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export function Skeleton({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.skeleton, style]} />;
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    minHeight: 12,
  },
});
