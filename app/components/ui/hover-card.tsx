// Ported from web - UI primitive
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HoverCard = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const HoverCardTrigger = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const HoverCardContent = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.content}>{children}</View>
);

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
});
