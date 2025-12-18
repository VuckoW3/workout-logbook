// Ported from web - UI primitive
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Table = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const TableHeader = ({ children }: { children?: React.ReactNode }) => <View style={styles.header}>{children}</View>;
export const TableBody = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const TableFooter = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const TableRow = ({ children }: { children?: React.ReactNode }) => <View style={styles.row}>{children}</View>;
export const TableHead = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.head}>{children}</Text> : <>{children}</>;
export const TableCell = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.cell}>{children}</Text> : <>{children}</>;
export const TableCaption = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.caption}>{children}</Text> : <>{children}</>;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  head: {
    flex: 1,
    fontWeight: '700',
    color: '#111827',
  },
  cell: {
    flex: 1,
    color: '#374151',
  },
  caption: {
    color: '#6b7280',
    marginTop: 4,
  },
});
