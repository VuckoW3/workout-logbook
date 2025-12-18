// Ported from web - UI primitive
import React from 'react';
import { View, ViewProps } from 'react-native';

export function Carousel({ children, style, ...props }: ViewProps) {
  return (
    <View {...props} style={style}>
      {children}
    </View>
  );
}

export const CarouselContent = Carousel;
export const CarouselItem = ({ children, style, ...props }: ViewProps) => (
  <View {...props} style={style}>
    {children}
  </View>
);
export const CarouselPrevious = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
export const CarouselNext = CarouselPrevious;
