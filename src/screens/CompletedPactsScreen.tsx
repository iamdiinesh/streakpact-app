import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface CompletedPactsScreenProps {
  onNavigate?: (screen: 'home') => void;
}

export default function CompletedPactsScreen({ onNavigate }: CompletedPactsScreenProps) {
  const { theme, colors } = useTheme();
  const completedPacts = [
    { id: '1', goal: 'Drink 2L Water', friend: 'David Chen', time: '10:30 AM' },
    { id: '2', goal: '10k Steps', friend: 'Emma Wilson', time: '2:15 PM' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Completed Today</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={[styles.iconCircle, { backgroundColor: theme === 'dark' ? colors.successLight : '#E8F5F1' }]}>
            <Ionicons name="checkmark-done" size={40} color={theme === 'dark' ? colors.success : '#1D9E75'} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.text }]}>Great Job!</Text>
          <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>You've completed {completedPacts.length} pacts today.</Text>
        </View>

        {completedPacts.map((pact) => (
          <View key={pact.id} style={[styles.completedCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <View style={styles.cardHeader}>
              <View style={styles.goalInfo}>
                <Text style={[styles.goalTitle, { color: colors.text }]}>{pact.goal}</Text>
                <Text style={[styles.friendText, { color: colors.textSecondary }]}>with {pact.friend}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: theme === 'dark' ? colors.successLight : '#E8F5F1' }]}>
                <Ionicons name="checkmark-circle" size={16} color={theme === 'dark' ? colors.success : '#1D9E75'} />
                <Text style={[styles.statusText, { color: theme === 'dark' ? colors.success : '#1D9E75' }]}>Done</Text>
              </View>
            </View>
            
            {/* Mock Proof Photo Placeholder */}
            <View style={[styles.proofContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Ionicons name="image-outline" size={32} color={colors.textMuted} />
              <Text style={[styles.proofText, { color: colors.textMuted }]}>Proof uploaded at {pact.time}</Text>
            </View>
          </View>
        ))}
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 16,
    color: '#6E7781',
  },
  completedCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 4,
  },
  friendText: {
    fontSize: 14,
    color: '#6E7781',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#1D9E75',
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 4,
  },
  proofContainer: {
    height: 140,
    backgroundColor: '#F0F4F8',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E1E4E8',
    borderStyle: 'dashed',
  },
  proofText: {
    color: '#99A2AD',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
});
