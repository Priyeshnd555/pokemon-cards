import { StyleSheet, Switch, View } from 'react-native';

import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { ThemedText } from '@/src/components/ui/themed-text';
import { ThemedView } from '@/src/components/ui/themed-view';
import { useThemeColor } from '@/src/hooks/use-theme-color';
import { usePokemonStore } from '@/src/store/pokemon-store';

export default function ModalScreen() {
  const theme = usePokemonStore((state) => state.theme);
  const toggleTheme = usePokemonStore((state) => state.toggleTheme);
  const successColor = useThemeColor({}, 'success');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="gearshape.fill" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
        <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
            <ThemedText style={styles.description}>Enjoy a nighttime Pokémon encounter</ThemedText>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={theme === 'dark' ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>PokéSwipe v1.1.0</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
  },
  section: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    opacity: 0.4,
    fontSize: 12,
  },
});
