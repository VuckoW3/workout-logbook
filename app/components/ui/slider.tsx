// Ported from web - UI primitive
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface SliderProps extends ViewProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
}

export function Slider({ value = 0, minimumValue = 0, maximumValue = 100, style }: SliderProps) {
  const clamped =
    maximumValue === minimumValue ? 0 : Math.min(Math.max(value, minimumValue), maximumValue);
  const ratio = (clamped - minimumValue) / (maximumValue - minimumValue);

  return (
    <View style={[styles.track, style]}>
      <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#111827',
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    marginLeft: -8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#111827',
  },
});
