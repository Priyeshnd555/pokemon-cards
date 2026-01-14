// WHY: This component provides a consistent header for app screens,
// including a title, optional subtitle, and an optional settings button.
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/src/hooks/use-theme-color';
import { IconSymbol } from './icon-symbol';
import { ThemedText } from './themed-text';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
}

export function ScreenHeader({ title, subtitle, showSettings = true }: ScreenHeaderProps) {
  const router = useRouter();
  const softBlue = useThemeColor({}, 'softBlue');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.header}>
      <View style={styles.headerMain}>
        <ThemedText type="title">{title}</ThemedText>
        {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
      </View>
      {showSettings && (
        <TouchableOpacity
          onPress={() => router.push('/modal')}
          style={[styles.settingsButton, { backgroundColor: softBlue }]}
          accessibilityLabel="Open Settings"
          accessibilityRole="button"
        >
          <IconSymbol name="gearshape.fill" size={24} color={tintColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerMain: {
    flex: 1,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
});
