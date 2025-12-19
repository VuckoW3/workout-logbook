// Ported from web - screen helper
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    if (!name.trim()) return;
    const exercise = onSave(name, category);
    onSelect(exercise);
  };

  const canSubmit = name.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.backButton} hitSlop={8}>
            <Text style={styles.backText}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Add custom exercise</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formCard}>
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
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <Pressable
            onPress={handleSubmit}
            disabled={!canSubmit}
            style={[styles.saveButton, !canSubmit ? styles.saveDisabled : null]}
          >
            <Text style={styles.saveText}>Add exercise</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  backText: {
    fontSize: 18,
    color: '#6b7280',
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
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
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  saveButton: {
    height: 52,
    borderRadius: 14,
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
