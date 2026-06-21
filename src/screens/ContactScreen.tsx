import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface ContactScreenProps {
  onNavigate?: (screen: 'settings') => void;
}

export default function ContactScreen({ onNavigate }: ContactScreenProps) {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('settings')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Help & Contact</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.heroContainer}>
          <View style={[styles.iconCircle, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#E6EFFF' }]}>
            <Ionicons name="chatbubbles" size={32} color={theme === 'dark' ? colors.primary : "#0F6EFF"} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>We're here to help</Text>
          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
            Got questions or need assistance? Reach out to us via email or mail. We usually respond within 24 hours.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          {/* Email Info */}
          <View style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
              <Ionicons name="mail" size={20} color={colors.text} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Email Support</Text>
              <Text style={[styles.value, { color: colors.text }]}>dineshgupt369@gmail.com</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Address Info */}
          <View style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
              <Ionicons name="location" size={20} color={colors.text} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Office Address</Text>
              <Text style={[styles.value, { color: colors.text }]}>118B pasirpanjan Road</Text>
              <Text style={[styles.value, { color: colors.text }]}>118542 Singapore</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A24',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E6EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 12,
  },
  heroDesc: {
    fontSize: 15,
    color: '#6E7781',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    paddingTop: 2,
  },
  label: {
    fontSize: 13,
    color: '#6E7781',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#1A1A24',
    fontWeight: '600',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F4F8',
    marginVertical: 24,
  },
});
