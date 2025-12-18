// Ported from web - UI primitive
import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export function ScrollArea(props: ScrollViewProps) {
  return <ScrollView {...props}>{props.children}</ScrollView>;
}
