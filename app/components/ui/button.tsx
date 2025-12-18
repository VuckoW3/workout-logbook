// Ported from web - UI primitive
import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type Size = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps {
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const baseButton: ViewStyle = {
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
};

const variants: Record<Variant, ViewStyle> = {
  default: { backgroundColor: '#111827' },
  destructive: { backgroundColor: '#ef4444' },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#d1d5db' },
  secondary: { backgroundColor: '#e5e7eb' },
  ghost: { backgroundColor: 'transparent' },
  link: { backgroundColor: 'transparent' },
};

const sizes: Record<Size, { container: ViewStyle; text: TextStyle }> = {
  default: { container: { paddingHorizontal: 16, height: 40 }, text: { fontSize: 14 } },
  sm: { container: { paddingHorizontal: 12, height: 36, borderRadius: 6 }, text: { fontSize: 13 } },
  lg: { container: { paddingHorizontal: 20, height: 44, borderRadius: 10 }, text: { fontSize: 16 } },
  icon: { container: { width: 40, height: 40 }, text: { fontSize: 14 } },
};

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ children, onPress, disabled, variant = 'default', size = 'default', style, textStyle }, ref) => {
    const sizeStyles = sizes[size];
    const variantStyles = variants[variant];

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          baseButton,
          sizeStyles.container,
          variantStyles,
          disabled ? { opacity: 0.5 } : null,
          pressed ? { transform: [{ scale: 0.98 }] } : null,
          style,
        ]}
      >
        {typeof children === 'string' ? (
          <Text
            style={[
              styles.text,
              sizeStyles.text,
              variant === 'destructive' ? { color: '#fff' } : null,
              variant === 'outline' || variant === 'ghost' || variant === 'link' ? { color: '#111827' } : { color: '#fff' },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
);
Button.displayName = 'Button';

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
  },
});

export const buttonVariants = { variants, sizes };
