// Ported from web - screen helper
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { MUSCLE_GROUPS } from '../lib/useCustomExercises';
import { ExerciseDefinition } from '../types/workout';

interface AddCustomExerciseScreenProps {
  onSave: (name: string, category: string) => ExerciseDefinition;
  onClose: () => void;
  onSelect: (exercise: ExerciseDefinition) => void;
}

export default function AddCustomExerciseScreen({ onSave, onClose, onSelect }: AddCustomExerciseScreenProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    const exercise = onSave(name, category);
    onSelect(exercise);
  };

  const canSubmit = name.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Add custom exercise</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Exercise name"
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Muscle group (optional)</Text>
          <View>
            <Pressable onPress={() => setShowDropdown((prev) => !prev)} style={styles.dropdownTrigger}>
              <Text style={category ? styles.dropdownValue : styles.dropdownPlaceholder}>
                {category || 'Select muscle group'}
              </Text>
              <Text style={styles.dropdownChevron}>{showDropdown ? '^' : 'v'}</Text>
            </Pressable>

            {showDropdown ? (
              <View style={styles.dropdownList}>
                {MUSCLE_GROUPS.map((group) => (
                  <Pressable
                    key={group}
                    onPress={() => {
                      setCategory(group);
                      setShowDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{group}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={[styles.saveButton, !canSubmit ? styles.saveDisabled : null]}
        >
          <Text style={styles.saveText}>Add exercise</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
    color: '#6b7280',
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  body: {
    padding: 16,
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  dropdownTrigger: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
  },
  dropdownValue: {
    color: '#111827',
  },
  dropdownPlaceholder: {
    color: '#9ca3af',
  },
  dropdownChevron: {
    color: '#9ca3af',
  },
  dropdownList: {
    marginTop: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownItemText: {
    color: '#111827',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveDisabled: {
    backgroundColor: '#e5e7eb',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
