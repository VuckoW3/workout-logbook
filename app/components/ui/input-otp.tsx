// Ported from web - UI primitive
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputOTPProps extends TextInputProps {
  slots?: number;
}

export const InputOTP = ({ slots = 4, style, ...props }: InputOTPProps) => {
  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: slots }).map((_, index) => (
        <TextInput key={index} style={styles.slot} keyboardType="number-pad" maxLength={1} {...props} />
      ))}
    </View>
  );
};

export const InputOTPGroup = ({ children }: { children?: React.ReactNode }) => <View style={styles.row}>{children}</View>;
export const InputOTPSlot = ({ children, ...props }: TextInputProps) => (
  <TextInput style={styles.slot} maxLength={1} {...props}>
    {children}
  </TextInput>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  slot: {
    width: 44,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
    textAlign: 'center',
    fontSize: 18,
  },
});
