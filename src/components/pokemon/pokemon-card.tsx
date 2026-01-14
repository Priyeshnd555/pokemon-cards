import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useThemeColor } from '@/src/hooks/use-theme-color';
import { Pokemon } from '@/src/types/pokemon';
import { CardActions } from './card-actions';
import { CardImage } from './card-image';
import { CardInfo } from './card-info';

const { width } = Dimensions.get('window');

interface PokemonCardProps {
  pokemon: Pokemon;
  onLike: () => void;
  onDislike: () => void;
}

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 120,
};

export function PokemonCard({ pokemon, onLike, onDislike }: PokemonCardProps) {
  const cardBg = useThemeColor({}, 'cardBackground');
  const cardShadow = useThemeColor({}, 'cardShadow');
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` }
    ],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Reset animations when pokemon change
    scale.value = withSpring(1, SPRING_CONFIG);
    opacity.value = withTiming(1, { duration: 400 });
    translateX.value = withSpring(0, SPRING_CONFIG);
    rotate.value = withSpring(0, SPRING_CONFIG);
  }, [pokemon.id]);

  const handleLike = () => {
    translateX.value = withTiming(width, { duration: 400 });
    rotate.value = withTiming(15, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
    setTimeout(onLike, 400);
  };

  const handleDislike = () => {
    translateX.value = withTiming(-width, { duration: 400 });
    rotate.value = withTiming(-15, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 });
    setTimeout(onDislike, 400);
  };

  const onPressIn = () => {
    scale.value = withSpring(0.96, SPRING_CONFIG);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG);
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(600)}
      style={[
        styles.cardContainer, 
        animatedStyle,
        { backgroundColor: cardBg, shadowColor: cardShadow }
      ]}
    >
      <View style={styles.innerContainer}>
        <CardImage uri={pokemon.sprites.other.dream_world.front_default} />
        
        <CardInfo 
          name={pokemon.name} 
          types={pokemon.types.map(t => t.type.name)} 
          abilities={pokemon.abilities.map(a => a.ability.name)} 
        />

        <CardActions 
          pokemonName={pokemon.name}
          onLike={handleLike} 
          onDislike={handleDislike} 
          onPressIn={onPressIn} 
          onPressOut={onPressOut} 
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    flex: 1,
    maxHeight: '90%',
    alignSelf: 'center',
    borderRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 10,
    marginVertical: 10,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 32,
  },
});
