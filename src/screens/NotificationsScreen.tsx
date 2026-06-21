import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface NotificationsScreenProps {
  onNavigate?: (screen: 'home') => void;
}

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const { theme, colors } = useTheme();
  const notifications = [
    { 
      id: '1', 
      type: 'deadline', 
      title: 'Deadline Approaching! ⏰', 
      message: 'You have 2 hours left to upload proof for your Morning Run streak.', 
      time: '10m ago',
      icon: 'time-outline',
      color: '#D85A30',
      bgColor: '#FFF0EB'
    },
    { 
      id: '2', 
      type: 'nudge', 
      title: 'New Nudge 👋', 
      message: 'David nudged you to complete your Water Pact today!', 
      time: '1h ago',
      icon: 'hand-right-outline',
      color: '#0F6EFF',
      bgColor: '#E6EFFF'
    },
    { 
      id: '3', 
      type: 'invite', 
      title: 'Pact Invitation 💌', 
      message: 'Sarah challenged you to a "Read 10 pages" pact.', 
      time: '3h ago',
      icon: 'mail-outline',
      color: '#8A38F5',
      bgColor: '#F3E8FF'
    },
    { 
      id: '4', 
      type: 'system', 
      title: 'Streak Saved! 🔥', 
      message: 'You successfully completed your 12-day streak for Yoga.', 
      time: 'Yesterday',
      icon: 'flame-outline',
      color: '#1D9E75',
      bgColor: '#E8F5F1'
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.markAllReadContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent</Text>
          <TouchableOpacity>
            <Text style={[styles.markAllText, { color: colors.primary }]}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        {notifications.map((notif) => (
          <View key={notif.id} style={[styles.notificationCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <View style={[styles.iconContainer, { backgroundColor: theme === 'dark' ? colors.card : notif.bgColor }]}>
              <Ionicons name={notif.icon as any} size={24} color={notif.color} />
            </View>
            <View style={styles.notificationInfo}>
              <View style={styles.titleRow}>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>{notif.title}</Text>
                <Text style={[styles.timeText, { color: colors.textMuted }]}>{notif.time}</Text>
              </View>
              <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{notif.message}</Text>
              
              {notif.type === 'invite' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Invite</Text>
                </TouchableOpacity>
              )}
              {notif.type === 'deadline' && (
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#D85A30' }]}>
                  <Text style={styles.actionButtonText}>Upload Proof</Text>
                </TouchableOpacity>
              )}
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
  markAllReadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
  },
  markAllText: {
    color: '#0F6EFF',
    fontWeight: '600',
    fontSize: 14,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A24',
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#99A2AD',
    fontWeight: '500',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6E7781',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#0F6EFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
