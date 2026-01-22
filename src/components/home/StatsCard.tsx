import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/statsCard.styles';

interface StatsCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  title: string;
  subtitle: string;
  highlight?: string;
  pendingText?: string;
}

export function StatsCard({ icon, iconColor, title, subtitle, highlight, pendingText }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
        <MaterialCommunityIcons name={icon} size={32} color={iconColor} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        
        {highlight && (
          <View style={styles.highlightContainer}>
            <Text style={[styles.highlight, { color: iconColor }]}>{highlight}</Text>
            {pendingText && <Text style={styles.pendingText}>{pendingText}</Text>}
          </View>
        )}
      </View>
    </View>
  );
}
