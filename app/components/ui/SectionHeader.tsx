// Ported from web - UI primitive
import React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

interface SectionHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SectionHeader = ({ children, style, textStyle }: SectionHeaderProps) => {
  return (
    <View style={style}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 12,
  },
});

export default SectionHeader;
