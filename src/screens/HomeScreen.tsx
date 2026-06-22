import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image, Modal, Animated, Easing } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

let hasShownWelcome = false;

export const resetWelcomeModal = () => {
  hasShownWelcome = false;
};


interface HomeScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'settings' | 'editProfile' | 'friends' | 'createPact' | 'inbox' | 'completed' | 'notifications' | 'achievements') => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { theme, toggleTheme, colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;
  const [showWelcome, setShowWelcome] = useState(!hasShownWelcome);

  useEffect(() => {
    if (showWelcome) {
      hasShownWelcome = true;
    }
  }, [showWelcome]);

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
          <View style={{ width: 44, height: 44, borderRadius: 22, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={{ width: '100%', height: '100%', transform: [{ scale: 1.8 }] }} 
              resizeMode="cover"
            />
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

        {/* Main Hero Area */}
        <View style={styles.heroContainer}>
          <View style={styles.heroContent}>
            <Text style={[styles.heroGreeting, { color: colors.textSecondary }]}>Welcome back, Marilyn! 👋</Text>
            <Text style={[styles.heroTitle, { color: colors.text }]}>Let's keep your</Text>
            <View style={styles.heroRow}>
              <View style={[styles.heroBadge, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="flash" size={16} color={colors.primary} style={{marginRight: 4}} />
                <Text style={[styles.heroBadgeText, { color: colors.primary }]}>2 PACTS</Text>
              </View>
              <Text style={[styles.heroTitle, { color: colors.text }]}> alive! 🔥</Text>
            </View>
            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>Post your proof photos before the daily deadline to protect your streak.</Text>
          </View>
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

        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('achievements')}>
          <Ionicons name="trophy-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate && onNavigate('profile')}>
          <Ionicons name="person-outline" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <WelcomeModal visible={showWelcome} onClose={() => setShowWelcome(false)} colors={colors} />
    </SafeAreaView>
  );
}

const WelcomeModal = ({ visible, onClose, colors }: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200, // Slower, more majestic entrance
        delay: 800, // Longer wait before the logo pops up
        easing: Easing.out(Easing.back(1.2)), // Smooth overshoot bounce
        useNativeDriver: false,
      }).start();

      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: false,
        })
      ).start();

      // Fast Fire Glow Flicker
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 120, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0.5, duration: 90, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0.9, duration: 130, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0.4, duration: 110, useNativeDriver: false }),
        ])
      ).start();

      const timer = setTimeout(() => {
        closeModal();
      }, 5500); // Extended from 4500 to account for the slower animation
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const closeModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  if (!visible) return null;

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const popScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.3]
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.15]
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1]
  });

  const translateY = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0]
  });

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.welcomeOverlay}>
        <View style={styles.welcomeBg} />
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome to Streakpact!</Text>
          <Text style={styles.welcomeSubtitle}>Keep your promises alive.</Text>

          <Animated.View style={[styles.logo3dContainer, { transform: [{ translateY }] }]}>
            {/* Soft Flame Aura (Concentric Gradient Fake) */}
            <Animated.View 
              style={[
                styles.fireGlowContainer,
                {
                  opacity: glowOpacity,
                  transform: [{ scale: glowScale }]
                }
              ]} 
            >
              <View style={[styles.fireGlowLayer, { width: 170, height: 170, backgroundColor: 'rgba(255, 120, 0, 0.5)' }]} />
              <View style={[styles.fireGlowLayer, { width: 210, height: 210, backgroundColor: 'rgba(255, 80, 0, 0.25)' }]} />
              <View style={[styles.fireGlowLayer, { width: 260, height: 260, backgroundColor: 'rgba(255, 50, 0, 0.1)' }]} />
              <View style={[styles.fireGlowLayer, { width: 320, height: 320, backgroundColor: 'rgba(255, 20, 0, 0.04)' }]} />
            </Animated.View>

            {[...Array(12)].map((_, i) => (
              <Animated.View
                key={`logo-edge-${i}`}
                style={[
                  styles.logoEdge,
                  {
                    backgroundColor: '#0F6EFF',
                    transform: [
                      { perspective: 800 },
                      { scale: popScale },
                      { rotateY: rotateY },
                      { translateZ: -i * 2 }
                    ]
                  }
                ]}
              />
            ))}

            <Animated.View
              style={[
                styles.logoFace,
                {
                  transform: [
                    { perspective: 800 },
                    { scale: popScale },
                    { rotateY: rotateY },
                    { translateZ: -24 },
                    { rotateY: '180deg' }
                  ]
                }
              ]}
            >
              <Image source={require('../../assets/logo.png')} style={styles.logoImg} resizeMode="cover" />
            </Animated.View>

            <Animated.View
              style={[
                styles.logoFace,
                {
                  transform: [
                    { perspective: 800 },
                    { scale: popScale },
                    { rotateY: rotateY },
                    { translateZ: 0 }
                  ]
                }
              ]}
            >
              <Image source={require('../../assets/logo.png')} style={styles.logoImg} resizeMode="cover" />
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

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
  heroContainer: {
    marginBottom: 32,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  heroGreeting: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 6,
  },
  heroBadgeText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 22,
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
  welcomeOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(10px)',
  },
  welcomeContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: '100%',
  },
  welcomeTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    color: '#60A5FA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 80,
  },
  logo3dContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireGlowContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireGlowLayer: {
    position: 'absolute',
    borderRadius: 999,
  },
  logoEdge: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  logoFace: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#0F6EFF',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.8 }],
  },
});
