// Ported from web - UI primitive
import React from 'react';
import { View } from 'react-native';

export function Form({ children }: { children?: React.ReactNode }) {
  return <View>{children}</View>;
}

export const FormField = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const FormItem = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const FormLabel = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const FormControl = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const FormDescription = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
export const FormMessage = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
