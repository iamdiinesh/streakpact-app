import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface InboxScreenProps {
  onNavigate?: (screen: 'home') => void;
}

export default function InboxScreen({ onNavigate }: InboxScreenProps) {
  const { theme, colors } = useTheme();
  const invites = [
    { id: '1', friend: 'Sarah Miller', goal: 'Read 10 pages', emoji: '🧘‍♀️', time: '2h ago' },
    { id: '2', friend: 'Alex Johnson', goal: 'Morning Run', emoji: '🏃‍♂️', time: '5h ago' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Inbox & Invites</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pending Invites ({invites.length})</Text>

        {invites.map((invite) => (
          <View key={invite.id} style={[styles.inviteCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <View style={styles.inviteHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.background }]}>
                <Text style={{fontSize: 24}}>{invite.emoji}</Text>
              </View>
              <View style={styles.inviteInfo}>
                <Text style={[styles.inviteText, { color: colors.text }]}>
                  <Text style={[styles.boldText, { color: colors.text }]}>{invite.friend}</Text> challenged you to a pact:
                </Text>
                <Text style={[styles.goalText, { color: colors.primary }]}>"{invite.goal}"</Text>
                <Text style={[styles.timeText, { color: colors.textMuted }]}>{invite.time}</Text>
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.declineButton, { backgroundColor: colors.background }]}>
                <Text style={[styles.declineText, { color: colors.textSecondary }]}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.acceptButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.acceptText}>Accept Pact</Text>
              </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 16,
  },
  inviteCard: {
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
  inviteHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  inviteInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  inviteText: {
    fontSize: 15,
    color: '#1A1A24',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
  },
  goalText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F6EFF',
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#99A2AD',
    marginTop: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
  },
  declineText: {
    color: '#6E7781',
    fontWeight: '700',
    fontSize: 15,
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#0F6EFF',
    alignItems: 'center',
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
