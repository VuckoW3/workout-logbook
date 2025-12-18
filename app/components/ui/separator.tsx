// Ported from web - UI primitive
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export function Separator(props: ViewProps) {
  return <View {...props} style={[styles.separator, props.style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    width: '100%',
  },
});
