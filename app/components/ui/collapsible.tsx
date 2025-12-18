// Ported from web - UI primitive
import React, { useState } from 'react';
import { View, Pressable, Text, ViewProps } from 'react-native';

export const Collapsible = ({ children, open: openProp, defaultOpen = false }: { children?: React.ReactNode; open?: boolean; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const value = openProp ?? open;
  return <View>{value ? children : null}</View>;
};

export const CollapsibleTrigger = ({ children, onPress }: { children?: React.ReactNode; onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
};

export const CollapsibleContent = ({ children, style }: ViewProps) => {
  return <View style={style}>{children}</View>;
};
