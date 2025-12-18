// Ported from web - UI primitive
import React from 'react';
import { View } from 'react-native';

export const ContextMenu = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuTrigger = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuContent = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuItem = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuLabel = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuSeparator = () => <View />;
export const ContextMenuCheckboxItem = ContextMenuItem;
export const ContextMenuRadioItem = ContextMenuItem;
export const ContextMenuGroup = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const ContextMenuSub = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const ContextMenuSubTrigger = ContextMenuTrigger;
export const ContextMenuSubContent = ContextMenuContent;
