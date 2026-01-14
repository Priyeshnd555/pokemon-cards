import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getPokemon } from '@/src/api/pokemon-api';
import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { LoadingSpinner } from '@/src/components/ui/loading-spinner';
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { Pokemon } from '@/src/types/pokemon';

const { width } = Dimensions.get('window');

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const cardBg = useThemeColor({}, 'cardBackground');
  const secondaryBg = useThemeColor({}, 'abilityTagBackground');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const secondaryText = useThemeColor({}, 'secondaryText');

  useEffect(() => {
    async function fetchDetails() {
      if (id) {
        try {
          const data = await getPokemon(Number(id));
          setPokemon(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <LoadingSpinner />
      </ThemedView>
    );
  }

  if (!pokemon) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Pokémon not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView 
        bounces={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#f8f9fa', '#e9ecef']}
            style={styles.imageBackground}
          >
            <TouchableOpacity 
              style={[styles.backButton, { backgroundColor: secondaryBg }]} 
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left" size={28} color={iconColor} />
            </TouchableOpacity>
            
            <Image
              source={{ uri: pokemon.sprites.other.dream_world.front_default }}
              style={styles.image}
              contentFit="contain"
            />
          </LinearGradient>
        </View>

        <View style={[styles.content, { backgroundColor: cardBg }]}>
          <ThemedText type="title" style={styles.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </ThemedText>
          <ThemedText style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</ThemedText>

          <View style={styles.statsContainer}>
            {pokemon.stats.map((stat) => (
              <View key={stat.stat.name} style={styles.statRow}>
                <ThemedText style={[styles.statLabel, { color: secondaryText }]}>{stat.stat.name.replace('-', ' ')}</ThemedText>
                <View 
                  style={[
                    styles.statBarContainer, 
                    { backgroundColor: secondaryBg }
                  ]}
                >
                  <View 
                    style={[
                      styles.statBar, 
                      { width: `${(stat.base_stat / 255) * 100}%` }
                    ]} 
                  />
                </View>
                <ThemedText style={styles.statValue}>{stat.base_stat}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Physical Traits</ThemedText>
            <View style={styles.traitsRow}>
              <View style={[styles.trait, { backgroundColor: secondaryBg }]}>
                <ThemedText style={[styles.traitLabel, { color: secondaryText }]}>Height</ThemedText>
                <ThemedText style={styles.traitValue}>{pokemon.height / 10} m</ThemedText>
              </View>
              <View style={[styles.trait, { backgroundColor: secondaryBg }]}>
                <ThemedText style={[styles.traitLabel, { color: secondaryText }]}>Weight</ThemedText>
                <ThemedText style={styles.traitValue}>{pokemon.weight / 10} kg</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 350,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
  },
  name: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 4,
  },
  id: {
    fontSize: 18,
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 24,
  },
  statsContainer: {
    marginBottom: 32,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    width: 100,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    backgroundColor: '#007aff',
    borderRadius: 4,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  traitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trait: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  traitLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  traitValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});
