// Ported from web - UI primitive
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  rightElement?: React.ReactNode;
  sticky?: boolean;
}

const ScreenHeader = ({ title, onBack, onClose, rightElement, sticky = false }: ScreenHeaderProps) => {
  const hasLeftAction = onBack || onClose;
  const onPressLeft = onBack || onClose;

  return (
    <View style={[styles.container, sticky ? styles.sticky : null]}>
      <View style={styles.row}>
        {hasLeftAction ? (
          <Pressable onPress={onPressLeft} style={styles.action}>
            <Text style={styles.icon}>{onBack ? '<' : 'X'}</Text>
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
        <Text style={styles.title}>{title}</Text>
        {rightElement || <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  sticky: {
    position: 'relative',
    top: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingTop: 8,
  },
  action: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
});

export default ScreenHeader;
