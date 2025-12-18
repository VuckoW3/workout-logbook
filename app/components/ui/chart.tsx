// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChartContainer = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

export const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.tooltip}>{children}</View>;
};

export const ChartTooltipContent = ({ children }: { children?: React.ReactNode }) => {
  return typeof children === 'string' ? <Text style={styles.tooltipText}>{children}</Text> : <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tooltip: {
    padding: 8,
    backgroundColor: '#111827',
    borderRadius: 8,
  },
  tooltipText: {
    color: '#fff',
  },
});
