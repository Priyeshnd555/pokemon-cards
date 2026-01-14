// WHY: This file implements the Welcome Screen for the PokéSwipe app.
// It serves as the entry point for the user, providing clear instructions
// and a call-to-action to start the main experience.

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';

import { useThemeColor } from '@/src/hooks/use-theme-color';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const softBlue = useThemeColor({}, 'softBlue');
  const tintColor = useThemeColor({}, 'tint');

  const handleStartPress = () => {
    router.push('/explore');
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.push('/modal')}
        style={[styles.settingsButton, { backgroundColor: softBlue }]}
        accessibilityLabel="Open Settings"
        accessibilityRole="button"
      >
        <IconSymbol name="gearshape.fill" size={24} color={tintColor} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ThemedText type="title" style={[styles.title, { color: tintColor }]}>
          PokéSwipe
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Gotta Catch Your Love!
        </ThemedText>

        <View style={[styles.instructionCard, { backgroundColor: softBlue, borderColor: softBlue }]}>
          <ThemedText style={styles.instructions}>
            Swipe right to <ThemedText type="defaultSemiBold" style={{ color: '#34C759' }}>Like</ThemedText> a Pokémon, {'\n'}
            swipe left to <ThemedText type="defaultSemiBold" style={{ color: '#FF3B30' }}>Dislike</ThemedText>.{'\n'}
            Build your ultimate dream team!
          </ThemedText>
        </View>

        <TouchableOpacity onPress={handleStartPress} activeOpacity={0.8}>
          <LinearGradient
            colors={['#007AFF', '#0055D4']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ThemedText type="subtitle" style={styles.buttonText}>
              Let's Go!
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40,
  },
  instructionCard: {
    padding: 20,
    borderRadius: 20,
    width: width * 0.85,
    marginBottom: 40,
    borderWidth: 1,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 25,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

// END WHY
