import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface PrivacyScreenProps {
  onNavigate?: (screen: 'settings') => void;
}

export default function PrivacyScreen({ onNavigate }: PrivacyScreenProps) {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('settings')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Privacy Policy</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <Text style={[styles.lastUpdated, { color: colors.textMuted }]}>Last updated: June 2026</Text>
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Introduction</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            Welcome to StreakPact. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our application and tell you about your privacy rights and how the law protects you.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Data We Collect</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We may collect, use, store and transfer different kinds of personal data about you, including:
            {'\n'}• <Text style={[styles.bold, { color: colors.text }]}>Identity Data:</Text> First name, last name, username.
            {'\n'}• <Text style={[styles.bold, { color: colors.text }]}>Contact Data:</Text> Email address, telephone numbers.
            {'\n'}• <Text style={[styles.bold, { color: colors.text }]}>Content Data:</Text> Photos and videos submitted as pact proof.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>3. How We Use Your Data</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to:
            {'\n'}• Manage your account and provide the StreakPact services.
            {'\n'}• Share your proof content exclusively with the specific friends you have created pacts with.
            {'\n'}• Improve our application, products/services, marketing, or customer relationships.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>4. Data Security</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>5. Contact Us</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            {'\n'}Email: dineshgupt369@gmail.com
            {'\n'}Address: 118B pasirpanjan Road 118542 singapore
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
  bold: {
    fontWeight: '700',
    color: '#1A1A24',
  },
});
