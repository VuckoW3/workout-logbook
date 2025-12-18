// Ported from web - UI primitive
import React from 'react';
import { View, ViewProps } from 'react-native';

export const ResizablePanelGroup = ({ children, style }: ViewProps) => <View style={style}>{children}</View>;
export const ResizablePanel = ({ children, style }: ViewProps) => <View style={style}>{children}</View>;
export const ResizableHandle = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
