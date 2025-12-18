// Ported from web - UI primitive
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export type TextareaProps = TextInputProps;

export const Textarea = React.forwardRef<TextInput, TextareaProps>(({ style, multiline = true, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.textarea, style]}
      multiline={multiline}
      placeholderTextColor="#9ca3af"
      textAlignVertical="top"
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const styles = StyleSheet.create({
  textarea: {
    minHeight: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 14,
  },
});
