import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface TermsScreenProps {
  onNavigate?: (screen: 'settings') => void;
}

export default function TermsScreen({ onNavigate }: TermsScreenProps) {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('settings')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Terms of Service</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>Last updated: June 2026</Text>
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Agreement to Terms</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            By accessing or using StreakPact, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>2. User Accounts</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. Pacts and Content</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Our service allows you to post photos, videos, or other material ("Content") as proof for your daily pacts. You are responsible for the Content that you post to the service, including its legality, reliability, and appropriateness. You must not post illegal, offensive, or inappropriate content.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Termination</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>5. Changes to Terms</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
          </Text>
        </View>
        <View style={{ height: 40 }} />
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
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 4,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#99A2AD',
    fontWeight: '600',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 12,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#6E7781',
    lineHeight: 24,
    marginBottom: 24,
  },
});
