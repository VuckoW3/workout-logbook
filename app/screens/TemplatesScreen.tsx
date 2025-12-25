import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddExerciseScreen from './AddExerciseScreen';
import { ExerciseDefinition, WorkoutTemplate } from '../types/workout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Templates'> & {
  templates: WorkoutTemplate[];
  onSaveTemplate: (template: WorkoutTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onStartFromTemplate: (template: WorkoutTemplate) => void;
  exercises: ExerciseDefinition[];
  customExercises?: ExerciseDefinition[];
  onAddCustomExercise?: (name: string, category: string) => ExerciseDefinition;
};

const createBlankTemplate = (): WorkoutTemplate => ({
  id: `tpl-${Date.now()}`,
  name: 'New template',
  exerciseIds: [],
});

export default function TemplatesScreen({
  templates,
  onSaveTemplate,
  onDeleteTemplate,
  onStartFromTemplate,
  exercises,
  customExercises,
  onAddCustomExercise,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<WorkoutTemplate | null>(null);
  const [showAddExercise, setShowAddExercise] = useState(false);

  const allExercises = useMemo<ExerciseDefinition[]>(
    () => exercises,
    [exercises],
  );

  const findExercise = (id: string) => allExercises.find((ex) => ex.id === id);

  const handleSave = () => {
    if (!draft) return;
    const name = draft.name.trim();
    if (!name) return;
    onSaveTemplate({ ...draft, name });
    setEditingId(null);
    setDraft(null);
  };

  const handleNew = () => {
    const tpl = createBlankTemplate();
    setEditingId(tpl.id);
    setDraft(tpl);
  };

  const handleSelectTemplate = (template: WorkoutTemplate) => {
    setEditingId(template.id);
    setDraft({ ...template });
  };

  const handleRemoveExercise = (index: number) => {
    if (!draft) return;
    const nextIds = draft.exerciseIds.filter((_, idx) => idx !== index);
    setDraft({ ...draft, exerciseIds: nextIds });
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    if (!draft) return;
    const nextIds = [...draft.exerciseIds];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= nextIds.length) return;
    const temp = nextIds[index];
    nextIds[index] = nextIds[targetIndex];
    nextIds[targetIndex] = temp;
    setDraft({ ...draft, exerciseIds: nextIds });
  };

  const handleAddExerciseToTemplate = (exercise: ExerciseDefinition) => {
    if (!draft) return;
    setDraft({ ...draft, exerciseIds: [...draft.exerciseIds, exercise.id] });
    setShowAddExercise(false);
  };

  const selectedTemplateExists = useMemo(
    () => (editingId ? templates.some((t) => t.id === editingId) : false),
    [editingId, templates],
  );

  // Close edit UI if selected template was removed from list (and it's not a new unsaved draft)
  React.useEffect(() => {
    if (editingId && !selectedTemplateExists && draft && templates.length > 0) {
      setEditingId(null);
      setDraft(null);
    }
  }, [editingId, selectedTemplateExists, draft, templates.length]);

  if (showAddExercise && draft) {
    return (
      <AddExerciseScreen
        onSelect={handleAddExerciseToTemplate}
        onClose={() => setShowAddExercise(false)}
        customExercises={customExercises}
        onAddCustomExercise={onAddCustomExercise}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Templates</Text>
          <Pressable onPress={handleNew} style={({ pressed }) => [styles.primary, pressed ? styles.pressed : null]}>
            <Text style={styles.primaryText}>New template</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.listWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Your templates</Text>
            {templates.length === 0 ? (
              <Text style={styles.empty}>No templates yet</Text>
            ) : (
              templates.map((template) => (
                <View key={template.id} style={styles.templateRow}>
                  <View style={styles.templateInfo}>
                    <Text style={styles.templateName}>{template.name}</Text>
                    <Text style={styles.templateMeta}>{template.exerciseIds.length} exercises</Text>
                  </View>
                  <View style={styles.templateActions}>
                    <Pressable
                      onPress={() => onStartFromTemplate(template)}
                      style={({ pressed }) => [styles.actionButton, pressed ? styles.pressed : null]}
                    >
                      <Text style={styles.actionText}>Start</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleSelectTemplate(template)}
                      style={({ pressed }) => [styles.actionButton, pressed ? styles.pressed : null]}
                    >
                      <Text style={styles.actionText}>Edit</Text>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>

          {draft ? (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Edit template</Text>
              <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={draft.name}
                  onChangeText={(text) => setDraft({ ...draft, name: text })}
                  style={styles.input}
                  placeholder="Template name"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.selectedExercises}>
                {draft.exerciseIds.length === 0 ? (
                  <Text style={styles.empty}>No exercises added</Text>
                ) : (
                  draft.exerciseIds.map((id, index) => {
                    const def = findExercise(id);
                    return (
                      <View key={`${id}-${index}`} style={styles.exerciseRow}>
                        <View style={styles.exerciseInfo}>
                          <Text style={styles.exerciseName}>{def?.name || 'Unknown exercise'}</Text>
                          {def ? <Text style={styles.exerciseMeta}>{def.category}</Text> : null}
                        </View>
                        <View style={styles.exerciseActions}>
                          <Pressable
                            onPress={() => handleMove(index, -1)}
                            style={({ pressed }) => [styles.smallButton, pressed ? styles.pressed : null]}
                          >
                            <Text style={styles.smallText}>↑</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => handleMove(index, 1)}
                            style={({ pressed }) => [styles.smallButton, pressed ? styles.pressed : null]}
                          >
                            <Text style={styles.smallText}>↓</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => handleRemoveExercise(index)}
                            style={({ pressed }) => [styles.smallButton, pressed ? styles.pressed : null]}
                          >
                            <Text style={styles.smallText}>✕</Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })
                )}
              </View>

              <Pressable
                onPress={() => setShowAddExercise(true)}
                style={({ pressed }) => [styles.secondary, pressed ? styles.pressed : null]}
              >
                <Text style={styles.secondaryText}>Add exercise</Text>
              </Pressable>

              <View style={styles.footerActions}>
                <Pressable onPress={handleSave} style={({ pressed }) => [styles.primary, pressed ? styles.pressed : null]}>
                  <Text style={styles.primaryText}>Save template</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (!draft) return;
                    onDeleteTemplate(draft.id);
                    setDraft(null);
                    setEditingId(null);
                  }}
                  style={({ pressed }) => [styles.danger, pressed ? styles.pressed : null]}
                >
                  <Text style={styles.dangerText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  listWrapper: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  empty: {
    color: '#9ca3af',
    fontSize: 13,
  },
  templateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  templateMeta: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  templateActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  actionText: {
    color: '#111827',
    fontWeight: '600',
  },
  field: {
    marginBottom: 14,
  },
  label: {
    color: '#6b7280',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  selectedExercises: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: '#111827',
    fontWeight: '600',
  },
  exerciseMeta: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  exerciseActions: {
    flexDirection: 'row',
    gap: 6,
  },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  smallText: {
    color: '#111827',
    fontWeight: '700',
  },
  primary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#2563eb',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondary: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  secondaryText: {
    color: '#111827',
    fontWeight: '600',
  },
  footerActions: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  danger: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
  },
  dangerText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
