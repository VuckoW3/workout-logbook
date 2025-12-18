// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export const Breadcrumb = ({ children }: { children?: React.ReactNode }) => <View style={styles.row}>{children}</View>;
export const BreadcrumbList = ({ children }: { children?: React.ReactNode }) => <View style={styles.row}>{children}</View>;
export const BreadcrumbItem = ({ children }: { children?: React.ReactNode }) => <View style={styles.row}>{children}</View>;
export const BreadcrumbSeparator = () => <Text style={styles.separator}>/</Text>;
export const BreadcrumbLink = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress}>{typeof children === 'string' ? <Text style={styles.link}>{children}</Text> : children}</Pressable>
);
export const BreadcrumbPage = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.page}>{children}</Text> : <>{children}</>;
export const BreadcrumbEllipsis = () => <Text style={styles.separator}>…</Text>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 6,
    color: '#9ca3af',
  },
  link: {
    color: '#111827',
    fontWeight: '600',
  },
  page: {
    color: '#6b7280',
  },
});
