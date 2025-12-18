// Ported from web - UI primitive
import React from 'react';
import { View, ViewProps } from 'react-native';

interface AspectRatioProps extends ViewProps {
  ratio?: number;
}

export function AspectRatio({ ratio = 1, style, children, ...props }: AspectRatioProps) {
  return (
    <View
      {...props}
      style={[
        {
          aspectRatio: ratio,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
