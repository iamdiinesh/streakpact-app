import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface ProfileScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'settings' | 'editProfile' | 'friends' | 'createPact' | 'achievements') => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('achievements');
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerNav}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('settings')}>
            <Ionicons name="settings-sharp" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Info Area */}
        <View style={styles.profileHeader}>
          {/* Avatar (Placeholder) */}
          <View style={[styles.avatarContainer, { backgroundColor: theme === 'dark' ? colors.card : '#EAD1FF' }]}>
            <Text style={{ fontSize: 50 }}>👱‍♀️</Text>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={[styles.nameText, { color: colors.text }]}>Marilyn</Text>
              <TouchableOpacity style={[styles.editNameButton, { backgroundColor: colors.primaryLight }]} onPress={() => onNavigate && onNavigate('editProfile')}>
                <Ionicons name="pencil" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.tagContainer, { backgroundColor: theme === 'dark' ? colors.card : '#E1E4E8' }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>marilyn@example.com</Text>
              <Ionicons name="copy-outline" size={12} color={colors.textSecondary} style={{ marginLeft: 6 }} />
            </View>

            <View style={styles.birthdayContainer}>
              <Ionicons name="gift-outline" size={14} color={colors.primary} />
              <Text style={[styles.birthdayText, { color: colors.primary }]}>Aug 14, 1998</Text>
            </View>
          </View>
        </View>

        {/* Theme Toggle */}
        <View style={[styles.themeRow, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={theme === 'dark' ? 'moon' : 'sunny'} size={20} color={colors.primary} style={{marginRight: 12}} />
            <Text style={[styles.themeLabel, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ false: '#E1E4E8', true: colors.primary }} thumbColor="#FFF" />
        </View>

        {/* Stats Row */}
        <View style={[styles.statsContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="lightning-bolt" size={24} color={colors.primary} />
            <View style={styles.statTextGroup}>
              <Text style={[styles.statValue, { color: colors.text }]}>14</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={20} color="#BA7517" />
            <View style={styles.statTextGroup}>
              <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pacts Won</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="diamond-stone" size={22} color={theme === 'dark' ? colors.primary : '#8A38F5'} />
            <View style={styles.statTextGroup}>
              <Text style={[styles.statValue, { color: colors.text }]}>x6</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Gems</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && { borderBottomColor: colors.text }]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'stats' ? colors.text : colors.textMuted }]}>My Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'achievements' && { borderBottomColor: colors.text }]}
            onPress={() => setActiveTab('achievements')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'achievements' ? colors.text : colors.textMuted }]}>Achievements</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'stats' ? (
            <View style={[styles.detailsCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <Text style={{color: colors.textSecondary, textAlign: 'center', padding: 20}}>More stats coming soon!</Text>
            </View>
          ) : (
            <View style={[styles.achievementsCard, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <View style={[styles.bannerPlaceholder, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#8A38F5' }]}>
                <Text style={{color: theme === 'dark' ? colors.primary : '#FFF', fontWeight: 'bold', fontSize: 18, marginBottom: 8}}>Level 3</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                  <MaterialCommunityIcons name="diamond-stone" size={32} color={theme === 'dark' ? colors.primary : '#FFF'} />
                  <Text style={{color: theme === 'dark' ? colors.primary : '#FFF', fontSize: 24, fontWeight: '800'}}>x6</Text>
                </View>
              </View>
              <Text style={[styles.unlockText, { color: colors.textSecondary }]}>Cards To Unlock (32)</Text>
            </View>
          )}
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
          <Ionicons name="trophy-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color={colors.primary} />
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
    marginBottom: 32,
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: '#EAD1FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EAD1FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A24',
  },
  editNameButton: {
    marginLeft: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E6EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1E4E8',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E7781',
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  birthdayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F6EFF',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTextGroup: {
    marginLeft: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A24',
  },
  statLabel: {
    fontSize: 11,
    color: '#6E7781',
    fontWeight: '600',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
    marginBottom: 24,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1A1A24',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#99A2AD',
  },
  activeTabText: {
    color: '#1A1A24',
  },
  tabContent: {
    flex: 1,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6E7781',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#1A1A24',
    fontWeight: '600',
  },
  achievementsCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    alignItems: 'center',
  },
  bannerPlaceholder: {
    width: '100%',
    backgroundColor: '#8A38F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  unlockText: {
    fontSize: 14,
    color: '#6E7781',
    fontWeight: '600',
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
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});