// Ported from web - UI primitive
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Sheet({ open = false, onOpenChange, children }: SheetProps) {
  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={() => onOpenChange?.(false)}>
      <View style={styles.container}>
        <View style={styles.sheet}>{children}</View>
      </View>
    </Modal>
  );
}

export const SheetTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <View onTouchStart={onPress}>{children}</View>
);
export const SheetContent = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const SheetHeader = ({ children }: { children?: React.ReactNode }) => <View style={styles.header}>{children}</View>;
export const SheetFooter = ({ children }: { children?: React.ReactNode }) => <View style={styles.footer}>{children}</View>;
export const SheetTitle = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const SheetDescription = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const SheetClose = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => (
  <View onTouchStart={onPress}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    marginBottom: 8,
  },
  footer: {
    marginTop: 8,
  },
});
