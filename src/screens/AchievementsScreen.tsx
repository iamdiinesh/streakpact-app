import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface AchievementsScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'createPact' | 'friends' | 'achievements' | 'monthlyBadges') => void;
}

export default function AchievementsScreen({ onNavigate }: AchievementsScreenProps) {
  const { theme, colors } = useTheme();
  const { width } = Dimensions.get('window');

  const topFriends = [
    { id: '1', name: 'Alex', emoji: '😎', streak: 45, color: '#FFD700' },
    { id: '2', name: 'Sarah', emoji: '👩‍🎤', streak: 32, color: '#C0C0C0' },
    { id: '3', name: 'David', emoji: '🤓', streak: 28, color: '#CD7F32' },
    { id: '4', name: 'Emma', emoji: '🥳', streak: 15, color: colors.border },
    { id: '5', name: 'Chris', emoji: '🤠', streak: 12, color: colors.border },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Achievements</Text>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Monthly Rewards Hero */}
        <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroSubtitle}>June Challenge</Text>
              <Text style={styles.heroTitle}>Summer Sprint ☀️</Text>
            </View>
            <View style={styles.heroIconBox}>
              <FontAwesome5 name="medal" size={28} color="#FFF" />
            </View>
          </View>
          
          <Text style={styles.heroDesc}>Hit a 20-day streak this month to unlock the exclusive Summer Badge and 500 bonus points!</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Progress</Text>
              <Text style={styles.progressText}>14 / 20 Days</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '70%' }]} />
            </View>
          </View>
        </View>

        {/* Earned Badges Section */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0 }]}>Monthly Badges</Text>
            <TouchableOpacity onPress={() => onNavigate && onNavigate('monthlyBadges')}>
              <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 14 }}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
            <View style={[styles.badgeCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                <FontAwesome5 name="fire-alt" size={24} color="#F59E0B" />
              </View>
              <Text style={[styles.badgeTitle, { color: colors.text }]}>7-Day Streak</Text>
              <Text style={styles.badgeDate}>May 12, 2026</Text>
            </View>
            
            <View style={[styles.badgeCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                <MaterialCommunityIcons name="handshake" size={28} color="#10B981" />
              </View>
              <Text style={[styles.badgeTitle, { color: colors.text }]}>First Pact</Text>
              <Text style={styles.badgeDate}>May 10, 2026</Text>
            </View>

            <View style={[styles.badgeCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <Ionicons name="water" size={28} color="#3B82F6" />
              </View>
              <Text style={[styles.badgeTitle, { color: colors.text }]}>Hydro Homie</Text>
              <Text style={styles.badgeDate}>June 2, 2026</Text>
            </View>
          </ScrollView>
        </View>

        {/* Top 5 Friends Leaderboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top 5 Friends</Text>
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            {topFriends.map((friend, index) => (
              <View key={friend.id} style={[styles.leaderboardRow, index !== topFriends.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                <View style={styles.rankContainer}>
                  <Text style={[styles.rankText, { color: colors.textMuted }]}>#{index + 1}</Text>
                </View>
                
                <View style={[styles.avatarCircle, { borderColor: friend.color, borderWidth: index < 3 ? 2 : 0, backgroundColor: colors.background }]}>
                  <Text style={styles.avatarEmoji}>{friend.emoji}</Text>
                </View>
                
                <Text style={[styles.friendName, { color: colors.text }]}>{friend.name}</Text>
                
                <View style={styles.streakBadge}>
                  <MaterialCommunityIcons name="fire" size={16} color={colors.danger} />
                  <Text style={[styles.streakText, { color: colors.danger }]}>{friend.streak}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Invite Friends CTA */}
        <View style={[styles.inviteCard, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#E6EFFF' }]}>
          <View style={styles.inviteContent}>
            <View style={styles.inviteIconCircle}>
              <Ionicons name="gift" size={28} color={theme === 'dark' ? colors.primary : '#0F6EFF'} />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={[styles.inviteTitle, { color: theme === 'dark' ? colors.primary : '#0F6EFF' }]}>Invite & Earn</Text>
              <Text style={[styles.inviteDesc, { color: theme === 'dark' ? colors.primary : '#0F6EFF' }]}>Get 100 points for every friend who joins StreakPact!</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.inviteButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.inviteButtonText}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="home-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('friends')}>
          <Ionicons name="people-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => onNavigate && onNavigate('createPact')}>
          <Ionicons name="add" size={28} color={colors.card} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('achievements')}>
          <Ionicons name="trophy" size={24} color={colors.primary} />
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 8,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  heroCard: {
    backgroundColor: '#0F6EFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  heroIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDesc: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  progressContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 16,
  },
  badgeCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A24',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDate: {
    fontSize: 11,
    color: '#99A2AD',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 4,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rankContainer: {
    width: 32,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#99A2AD',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A24',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
    marginLeft: 4,
  },
  inviteCard: {
    backgroundColor: '#E6EFFF',
    borderRadius: 24,
    padding: 24,
  },
  inviteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inviteIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F6EFF',
    marginBottom: 4,
  },
  inviteDesc: {
    fontSize: 14,
    color: '#0F6EFF',
    lineHeight: 20,
    opacity: 0.8,
  },
  inviteButton: {
    backgroundColor: '#0F6EFF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
    shadowRadius: 12,
    elevation: 8,
  },
});
