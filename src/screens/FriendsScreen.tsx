import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface FriendsScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'settings' | 'editProfile' | 'friends' | 'createPact' | 'achievements') => void;
}

export default function FriendsScreen({ onNavigate }: FriendsScreenProps) {
  const { theme, colors } = useTheme();
  // Mock data for friends
  const friends = [
    { id: '1', name: 'Alex Johnson', streak: 12, emoji: '🏃‍♂️' },
    { id: '2', name: 'Sarah Miller', streak: 45, emoji: '🧘‍♀️' },
    { id: '3', name: 'David Chen', streak: 3, emoji: '🏋️‍♂️' },
    { id: '4', name: 'Emma Wilson', streak: 0, emoji: '🎨' },
    { id: '5', name: 'James Carter', streak: 128, emoji: '📚' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerNav}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Friends</Text>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Invite Banner */}
        <View style={[styles.inviteBanner, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#8A38F5', shadowColor: theme === 'dark' ? 'transparent' : '#8A38F5' }]}>
          <View style={styles.inviteTextContainer}>
            <Text style={[styles.inviteTitle, { color: theme === 'dark' ? colors.primary : '#FFF' }]}>Invite & Earn Gems</Text>
            <Text style={[styles.inviteDesc, { color: theme === 'dark' ? colors.textSecondary : 'rgba(255,255,255,0.8)' }]}>Refer a friend to StreakPact and both of you get x10 gems!</Text>
          </View>
          <TouchableOpacity style={[styles.inviteButton, { backgroundColor: theme === 'dark' ? colors.background : 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name="person-add" size={18} color={theme === 'dark' ? colors.primary : '#FFF'} />
            <Text style={[styles.inviteButtonText, { color: theme === 'dark' ? colors.primary : '#FFF' }]}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Friends List */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Friends ({friends.length})</Text>
        
        <View style={[styles.friendsCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          {friends.map((friend, index) => (
            <View key={friend.id} style={[styles.friendRow, index === friends.length - 1 && { borderBottomWidth: 0 }, { borderBottomColor: colors.border }]}>
              <View style={[styles.avatar, { backgroundColor: colors.background }]}>
                <Text style={{fontSize: 24}}>{friend.emoji}</Text>
              </View>
              <View style={styles.friendInfo}>
                <Text style={[styles.friendName, { color: colors.text }]}>{friend.name}</Text>
                <View style={[styles.streakBadge, { backgroundColor: colors.dangerLight }]}>
                  <MaterialCommunityIcons name="fire" size={14} color={colors.danger} />
                  <Text style={[styles.streakText, { color: colors.danger }]}>{friend.streak} Day Streak</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.nudgeButton, { backgroundColor: colors.background }]}>
                <Text style={[styles.nudgeText, { color: colors.primary }]}>Nudge</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="home-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('friends')}>
          <Ionicons name="people" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => onNavigate && onNavigate('createPact')}>
          <Ionicons name="add" size={28} color={colors.card} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('achievements')}>
          <Ionicons name="trophy-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('profile')}>
          <Ionicons name="person-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 12,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A24',
    letterSpacing: -0.5,
  },
  iconButton: {
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
  inviteBanner: {
    backgroundColor: '#8A38F5',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    shadowColor: '#8A38F5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  inviteTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  inviteTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  inviteDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 18,
  },
  inviteButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  inviteButtonText: {
    color: '#FFF',
    fontWeight: '700',
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 16,
  },
  friendsCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 4,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendInfo: {
    flex: 1,
    marginLeft: 16,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A24',
    marginBottom: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0EB',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D85A30',
    marginLeft: 4,
  },
  nudgeButton: {
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  nudgeText: {
    color: '#0F6EFF',
    fontWeight: '700',
    fontSize: 13,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 32,
    elevation: 12,
  },
  navItem: {
    padding: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0F6EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32,
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
