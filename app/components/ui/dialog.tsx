// Ported from web - UI primitive
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => onOpenChange?.(false)}>
      <View style={styles.backdrop}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

export const DialogTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <View onTouchStart={onPress}>{children}</View>
);

export const DialogContent = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const DialogHeader = ({ children }: { children?: React.ReactNode }) => <View style={styles.header}>{children}</View>;
export const DialogFooter = ({ children }: { children?: React.ReactNode }) => <View style={styles.footer}>{children}</View>;
export const DialogTitle = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const DialogDescription = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const DialogClose = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <View onTouchStart={onPress}>{children}</View>
);

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
  header: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 8,
  },
});
