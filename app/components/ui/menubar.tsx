// Ported from web - UI primitive
import React from 'react';
import { View } from 'react-native';

export const Menubar = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarMenu = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarTrigger = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarContent = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarItem = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarSeparator = () => <View />;
export const MenubarCheckboxItem = MenubarItem;
export const MenubarRadioItem = MenubarItem;
export const MenubarPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const MenubarLabel = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarShortcut = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarGroup = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarSub = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const MenubarSubTrigger = MenubarTrigger;
export const MenubarSubContent = MenubarContent;
