import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';


interface HomeScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'settings' | 'editProfile' | 'friends' | 'createPact' | 'inbox' | 'completed' | 'notifications') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { theme, toggleTheme, colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;

  const [activeTasks, setActiveTasks] = useState([
    {
      id: '1',
      title: 'Morning Run with Alex',
      desc: "It's your 14th day! Snap a sweaty selfie to prove you hit the pavement.",
      emoji: '🏃‍♂️',
      deadline: '10:00 AM',
      streak: 13,
    },
    {
      id: '2',
      title: 'Read 10 Pages with Sarah',
      desc: "Time to hit the books! Snap a pic of the page you're currently reading.",
      emoji: '📚',
      deadline: '8:00 PM',
      streak: 5,
    }
  ]);

  const handleSubmitProof = (index: number) => {
    // Automatically swipe to the next task if there is one
    if (index < activeTasks.length - 1) {
      scrollViewRef.current?.scrollTo({ x: (cardWidth + 16) * (index + 1), animated: true });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Navigation */}
        <View style={styles.headerNav}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <Ionicons name="search-outline" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={toggleTheme}>
              <Ionicons name={theme === 'dark' ? 'moon' : 'sunny-outline'} size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('notifications')}>
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
              <View style={{position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger}} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Title Area */}
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: colors.text }]}>Let's keep your</Text>
          <View style={styles.titleRow}>
            <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.badgeText, { color: colors.primary }]}>2 pacts</Text>
            </View>
            <Text style={[styles.titleText, { color: colors.text }]}> alive! 🔥</Text>
          </View>
          <Text style={[styles.subtitleText, { color: colors.textSecondary }]}>Post your proof photos before the daily deadline.</Text>
        </View>

        {/* Prominent Task Carousel */}
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          snapToInterval={cardWidth + 16}
          decelerationRate="fast"
          contentContainerStyle={{ gap: 16 }}
          style={{ overflow: 'visible', marginBottom: 36 }}
        >
          {activeTasks.map((task, index) => (
            <View key={task.id} style={[styles.prominentCard, { width: cardWidth, marginBottom: 0, backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <View style={styles.cardHeader}>
                <View style={[styles.cardIconWrapper, { backgroundColor: colors.background }]}>
                  <Text style={styles.cardEmoji}>{task.emoji}</Text>
                </View>
                <TouchableOpacity>
                  <Feather name="more-horizontal" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{task.title}</Text>
              <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{task.desc}</Text>
              
              <View style={styles.cardDetails}>
                <Ionicons name="time-outline" size={14} color={colors.textMuted} />
                <Text style={[styles.cardDetailsText, { color: colors.textMuted }]}>Deadline: {task.deadline}</Text>
                <View style={{ width: 12 }} />
                <MaterialCommunityIcons name="fire" size={14} color={colors.danger} />
                <Text style={[styles.cardDetailsText, { color: colors.danger }]}>{task.streak} Day Streak</Text>
              </View>

              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]} onPress={() => handleSubmitProof(index)}>
                <Text style={styles.primaryButtonText}>Submit proof</Text>
                <Ionicons name="camera" size={16} color="#FFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Pact Activity */}
        <View style={styles.categoriesHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pact Activity</Text>
        </View>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: theme === 'dark' ? colors.card : '#FFF0EB', shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('inbox')}>
            <View style={[styles.categoryIcon, { backgroundColor: theme === 'dark' ? colors.dangerLight : '#FFD7C9' }]}>
              <Ionicons name="mail-outline" size={24} color={colors.danger} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={[styles.categoryTitle, { color: theme === 'dark' ? colors.text : '#6A2A15' }]}>Inbox & Invites</Text>
              <Text style={[styles.categoryDesc, { color: theme === 'dark' ? colors.textSecondary : '#8A4A35' }]}>Sarah challenged you to "Read 10 pages"</Text>
            </View>
            <View style={[styles.badgeCount, { backgroundColor: colors.danger }]}>
              <Text style={styles.badgeCountText}>1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: theme === 'dark' ? colors.card : '#F3E8FF', shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('friends')}>
            <View style={[styles.categoryIcon, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#EAD1FF' }]}>
              <Ionicons name="people-outline" size={24} color={theme === 'dark' ? colors.primary : '#5A228B'} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={[styles.categoryTitle, { color: theme === 'dark' ? colors.text : '#3B125E' }]}>Friends' Streaks</Text>
              <Text style={[styles.categoryDesc, { color: theme === 'dark' ? colors.textSecondary : '#5A228B' }]}>View follower activity & cheer them on!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: theme === 'dark' ? colors.card : '#E8F5F1', shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('completed')}>
            <View style={[styles.categoryIcon, { backgroundColor: theme === 'dark' ? colors.successLight : '#D1EAE2' }]}>
              <Ionicons name="checkmark-done" size={24} color={colors.success} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={[styles.categoryTitle, { color: theme === 'dark' ? colors.text : '#0F543C' }]}>Completed Today</Text>
              <Text style={[styles.categoryDesc, { color: theme === 'dark' ? colors.textSecondary : '#1D9E75' }]}>Drink 2L Water with David</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="home" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('friends')}>
          <Ionicons name="people-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => onNavigate && onNavigate('createPact')}>
          <Ionicons name="add" size={28} color={colors.card} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
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
    backgroundColor: '#F7F9FC', // Soft modern background like the video
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
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F6EFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A24',
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: '#0F6EFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitleText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6E7781',
    fontWeight: '500',
  },
  prominentCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 24,
    marginBottom: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A24',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6E7781',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardDetailsText: {
    fontSize: 13,
    color: '#99A2AD',
    marginLeft: 6,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#0F6EFF',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  categoriesHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A24',
  },
  categoriesContainer: {
    paddingHorizontal: 0,
    gap: 16,
    marginBottom: 32,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityTextContainer: {
    flex: 1,
  },
  badgeCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D85A30',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeCountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryDesc: {
    fontSize: 12,
    fontWeight: '500',
  },
  notificationBubble: {
    backgroundColor: '#D85A30', 
    borderRadius: 12, 
    paddingHorizontal: 8, 
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFF', 
    fontSize: 12, 
    fontWeight: 'bold',
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
