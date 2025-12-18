// Ported from web - UI primitive
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export type LabelProps = TextProps;

export const Label = React.forwardRef<Text, LabelProps>(({ style, children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.label, style]} {...props}>
      {children}
    </Text>
  );
});
Label.displayName = 'Label';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
});
