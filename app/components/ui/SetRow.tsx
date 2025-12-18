// Ported from web - UI primitive
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Input } from './input';
import { ExerciseSet } from '../../types/workout';

interface SetRowProps {
  set: ExerciseSet;
  index: number;
  editable?: boolean;
  onUpdate?: (field: keyof ExerciseSet, value: number | boolean) => void;
  onRemove?: () => void;
  canRemove?: boolean;
}

const SetRow = ({ set, index, editable = false, onUpdate, onRemove, canRemove = true }: SetRowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.index}>{index + 1}</Text>

      {editable ? (
        <>
          <Input
            keyboardType="decimal-pad"
            value={set.weight !== undefined ? String(set.weight) : ''}
            onChangeText={(value) => onUpdate?.('weight', parseFloat(value) || 0)}
            style={styles.input}
            placeholder="0"
          />
          <Input
            keyboardType="number-pad"
            value={set.reps !== undefined ? String(set.reps) : ''}
            onChangeText={(value) => onUpdate?.('reps', parseInt(value, 10) || 0)}
            style={styles.input}
            placeholder="0"
          />
          <Pressable
            onPress={onRemove}
            disabled={!canRemove}
            style={({ pressed }) => [
              styles.removeButton,
              !canRemove ? styles.disabled : null,
              pressed && canRemove ? styles.pressed : null,
            ]}
          >
            <Text style={styles.removeText}>-</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.value}>{set.weight}</Text>
          <Text style={styles.value}>{set.reps}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  index: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 48,
    textAlign: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  removeButton: {
    width: 36,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 20,
    color: '#9ca3af',
  },
  disabled: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.6,
  },
  value: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});

export default SetRow;
