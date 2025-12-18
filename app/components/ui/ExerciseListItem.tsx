// Ported from web - UI primitive
import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ExerciseListItemProps {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
  showBorder?: boolean;
}

const ExerciseListItem = ({ name, onPress, showBorder = true }: ExerciseListItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        showBorder ? styles.border : null,
        pressed ? styles.pressed : null,
      ]}
    >
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pressed: {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  text: {
    fontWeight: '600',
    color: '#111827',
    fontSize: 16,
  },
});

export default ExerciseListItem;
