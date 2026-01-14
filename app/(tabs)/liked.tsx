// WHY: This screen displays the collection of Pokémon that the user has liked.
// It provides a clear and organized view of the user's progress and favorites,
// reinforcing the core value proposition of the app.

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ScreenHeader } from '@/src/components/ui/screen-header';
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { usePokemonStore } from '@/src/store/pokemon-store';
import { Pokemon } from '@/src/types/pokemon';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 60) / COLUMN_COUNT;

export default function LikedScreen() {
  const likedPokemons = usePokemonStore((state) => state.likedPokemons);
  const router = useRouter();

  const colorScheme = useColorScheme();
  const cardBg = useThemeColor({}, 'cardBackground');
  const secondaryText = useThemeColor({}, 'secondaryText');
  const nameColor = useThemeColor({}, 'text');

  const gradientColors = colorScheme === 'dark' 
    ? (['#2C2C2E', '#1C1C1E'] as [string, string])
    : (['#FFFFFF', '#F2F2F7'] as [string, string]);

  const renderItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: cardBg }]} 
      activeOpacity={0.9}
      onPress={() => router.push(`/pokemon/${item.id}`)}
    >
      <LinearGradient colors={gradientColors} style={styles.imageContainer}>
        <Image
          source={{ uri: item.sprites.other.dream_world.front_default }}
          style={styles.image}
          contentFit="contain"
          transition={500}
        />
      </LinearGradient>
      <View style={styles.details}>
        <ThemedText type="defaultSemiBold" style={[styles.name, { color: nameColor }]} numberOfLines={1}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </ThemedText>
        <View style={styles.tagContainer}>
          {item.types.slice(0, 1).map((type) => (
            <View key={type.slot} style={styles.tag}>
              <ThemedText style={styles.tagText}>{type.type.name}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScreenHeader 
        title="My Collection" 
        subtitle={likedPokemons.length > 0 ? `${likedPokemons.length} Pokémon in your team` : 'Start your journey'}
      />

      {likedPokemons.length === 0 ? (
        <View style={styles.emptyState}>
          <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.emptyImage}
            contentFit="contain"
          />
          <ThemedText type="subtitle" style={styles.emptyTitle}>Your team is empty!</ThemedText>
          <ThemedText style={[styles.emptyText, { color: secondaryText }]}>Go to Discovery and find some wild Pokémon to build your dream team.</ThemedText>
          <TouchableOpacity 
            onPress={() => router.push('/explore')}
            activeOpacity={0.8}
          >
            <LinearGradient
                colors={['#007AFF', '#0055D4']}
                style={styles.emptyButton}
            >
                <ThemedText type="defaultSemiBold" style={styles.emptyButtonText}>Start Exploring</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={likedPokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={COLUMN_COUNT}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: ITEM_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  imageContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginTop: -40,
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
