import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardImageProps {
  uri: string;
}

export function CardImage({ uri }: CardImageProps) {
  const colorScheme = useColorScheme();
  
  const gradientColors = colorScheme === 'dark' 
    ? (['#2C2C2E', '#1C1C1E'] as [string, string])
    : (['#FFFFFF', '#F2F2F7'] as [string, string]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.background}>
        <Image 
          source={{ uri }} 
          style={styles.image} 
          contentFit="contain"
          transition={500}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  background: {
    height: 260, // Reduced from 300 to save space
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    height: '80%',
    width: '80%',
  },
});
