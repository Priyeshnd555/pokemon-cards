import { useThemeColor } from '@/src/hooks/use-theme-color';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface CardActionsProps {
  onLike: () => void;
  onDislike: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  pokemonName: string;
}

export function CardActions({ onLike, onDislike, onPressIn, onPressOut, pokemonName }: CardActionsProps) {
  const btnBg = useThemeColor({}, 'cardBackground');
  const successColor = useThemeColor({}, 'success');
  const errorColor = useThemeColor({}, 'error');

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLike();
  };

  const handleDislike = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDislike();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: btnBg, borderColor: errorColor }]} 
        onPress={handleDislike}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.7}
        accessibilityLabel={`Dislike ${pokemonName}`}
        accessibilityRole="button"
      >
        <IconSymbol name="xmark" size={28} color={errorColor} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: btnBg, borderColor: successColor }]} 
        onPress={handleLike}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.7}
        accessibilityLabel={`Like ${pokemonName}`}
        accessibilityRole="button"
      >
        <IconSymbol name="heart.fill" size={28} color={successColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    marginTop: 'auto',
    paddingBottom: 32,
    paddingTop: 10,
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#FFF', // Ensure base color for shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});
