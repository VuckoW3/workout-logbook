// Ported from web - UI primitive
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

export interface PaginationProps {
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ page = 1, pageCount = 1, onPageChange }: PaginationProps) {
  const prev = () => onPageChange?.(Math.max(1, page - 1));
  const next = () => onPageChange?.(Math.min(pageCount, page + 1));
  return (
    <View style={styles.row}>
      <Pressable onPress={prev} style={styles.button}>
        <Text>Previous</Text>
      </Pressable>
      <Text style={styles.page}>{page}</Text>
      <Pressable onPress={next} style={styles.button}>
        <Text>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginHorizontal: 6,
  },
  page: {
    fontWeight: '600',
  },
});
