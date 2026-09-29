import { useState } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  pressedColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

/**
 * Botão que troca de cor enquanto está pressionado (onPressIn)
 * e volta à cor original quando é solto (onPressOut).
 */
export function ColorButton({
  title,
  onPress,
  color = '#0F766E',
  pressedColor = '#F59E0B',
  disabled = false,
  style,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.button,
        { backgroundColor: isPressed ? pressedColor : color },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.4,
  },
});
