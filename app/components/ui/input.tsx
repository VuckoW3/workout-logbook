// Ported from web - UI primitive
import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export type InputProps = TextInputProps;

export const Input = React.forwardRef<TextInput, InputProps>(({ style, ...props }, ref) => {
  return <TextInput ref={ref} style={[styles.input, style]} placeholderTextColor="#9ca3af" {...props} />;
});
Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 14,
  },
});
