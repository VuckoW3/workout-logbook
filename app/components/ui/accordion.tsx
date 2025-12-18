// Ported from web - UI primitive
import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

export const Accordion = ({ children }: { children?: React.ReactNode }) => {
  return <View>{children}</View>;
};

export const AccordionItem = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.item}>{children}</View>;
};

interface AccordionTriggerProps {
  children?: React.ReactNode;
  label?: string;
}

export const AccordionTrigger = ({ children, label }: AccordionTriggerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => setOpen((prev) => !prev)} style={styles.trigger}>
      {label ? <Text style={styles.triggerText}>{label}</Text> : children}
    </Pressable>
  );
};

export const AccordionContent = ({ children }: { children?: React.ReactNode }) => {
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  trigger: {
    paddingVertical: 12,
  },
  triggerText: {
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    paddingBottom: 12,
  },
});
