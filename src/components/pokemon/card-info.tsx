import { useThemeColor } from '@/src/hooks/use-theme-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ui/themed-text';

interface CardInfoProps {
  name: string;
  types: string[];
  abilities: string[];
}

export function CardInfo({ name, types, abilities }: CardInfoProps) {
  const typeTagBg = useThemeColor({}, 'typeTagBackground');
  const typeTagBorder = useThemeColor({}, 'typeTagBorder');
  const tagTextColor = useThemeColor({}, 'tagText');

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </ThemedText>
      
      <InfoSection label="Types" items={types} typeTagBg={typeTagBg} typeTagBorder={typeTagBorder} tagTextColor={tagTextColor} />
      <InfoSection label="Abilities" items={abilities} typeTagBg={typeTagBg} typeTagBorder={typeTagBorder} tagTextColor={tagTextColor} />
    </View>
  );
}

function InfoSection({ label, items, typeTagBg, typeTagBorder, tagTextColor }: any) {
  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>{label}</ThemedText>
      <View style={styles.tagContainer}>
        {items.map((item: string, index: number) => (
          <View key={index} style={[styles.tag, { backgroundColor: typeTagBg, borderColor: typeTagBorder }]}>
            <ThemedText style={[styles.tagText, { color: tagTextColor }]}>{item}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 8,
    textAlign: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
