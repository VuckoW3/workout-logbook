// Ported from web - UI primitive
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function AlertDialog({ open = false, onOpenChange, children }: AlertDialogProps) {
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => onOpenChange?.(false)}>
      <View style={styles.backdrop}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

export const AlertDialogTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress}>{children}</Pressable>
);

export const AlertDialogContent = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.body}>{children}</View>;
};

export const AlertDialogHeader = ({ children }: { children?: React.ReactNode }) => <View style={styles.header}>{children}</View>;
export const AlertDialogFooter = ({ children }: { children?: React.ReactNode }) => <View style={styles.footer}>{children}</View>;
export const AlertDialogTitle = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.title}>{children}</Text> : <>{children}</>;
export const AlertDialogDescription = ({ children }: { children?: React.ReactNode }) =>
  typeof children === 'string' ? <Text style={styles.description}>{children}</Text> : <>{children}</>;
export const AlertDialogAction = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.action}>
    {typeof children === 'string' ? <Text style={styles.actionText}>{children}</Text> : children}
  </Pressable>
);
export const AlertDialogCancel = AlertDialogAction;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
  },
  body: {
    marginBottom: 8,
  },
  header: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
