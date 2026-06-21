import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface MonthlyBadgesScreenProps {
  onNavigate?: (screen: 'achievements') => void;
}

export default function MonthlyBadgesScreen({ onNavigate }: MonthlyBadgesScreenProps) {
  const { theme, colors } = useTheme();
  const { width } = Dimensions.get('window');
  
  // Calculate item width for 3 columns with gap
  const numColumns = 3;
  const paddingHorizontal = 20;
  const gap = 12;
  const availableWidth = width - (paddingHorizontal * 2) - (gap * (numColumns - 1));
  const itemWidth = Math.floor(availableWidth / numColumns);

  // Dynamic badge sizing so it perfectly fits 3 columns even on smaller phones
  const badgeSize = Math.min(96, itemWidth);
  const innerSize = badgeSize * (80/96);
  const imageSize = innerSize;

  // Mock data using custom 3D cartoon character assets
  const badgeData = [
    {
      year: '2026',
      badges: [
        { id: '1', month: 'January', image: require('../../assets/badges/jan.png'), color: '#0EA5E9', border: '#0284C7', shadow: '#0369A1', achieved: true },
        { id: '2', month: 'February', image: require('../../assets/badges/feb.png'), color: '#F43F5E', border: '#E11D48', shadow: '#BE123C', achieved: true },
        { id: '3', month: 'March', image: require('../../assets/badges/mar.png'), color: '#10B981', border: '#059669', shadow: '#047857', achieved: true },
        { id: '4', month: 'April', image: require('../../assets/badges/apr.png'), color: '#FBBF24', border: '#D97706', shadow: '#B45309', achieved: true },
        { id: '5', month: 'May', image: require('../../assets/badges/jan.png'), color: '#8B5CF6', border: '#7C3AED', shadow: '#6D28D9', achieved: true },
        { id: '6', month: 'June', image: require('../../assets/badges/feb.png'), color: '#F59E0B', border: '#D97706', shadow: '#B45309', achieved: false },
        { id: '7', month: 'July', image: require('../../assets/badges/mar.png'), color: colors.border, border: colors.border, shadow: colors.border, achieved: false },
      ]
    },
    {
      year: '2025',
      badges: [
        { id: '25-1', month: 'July', image: require('../../assets/badges/apr.png'), color: '#EF4444', border: '#DC2626', shadow: '#B91C1C', achieved: true },
        { id: '25-2', month: 'August', image: require('../../assets/badges/jan.png'), color: '#0EA5E9', border: '#0284C7', shadow: '#0369A1', achieved: false },
        { id: '25-3', month: 'September', image: require('../../assets/badges/feb.png'), color: '#F59E0B', border: '#D97706', shadow: '#B45309', achieved: false },
        { id: '25-4', month: 'October', image: require('../../assets/badges/mar.png'), color: '#A855F7', border: '#9333EA', shadow: '#7E22CE', achieved: true },
        { id: '25-5', month: 'November', image: require('../../assets/badges/apr.png'), color: '#D97706', border: '#B45309', shadow: '#92400E', achieved: true },
        { id: '25-6', month: 'December', image: require('../../assets/badges/jan.png'), color: '#10B981', border: '#059669', shadow: '#047857', achieved: false },
      ]
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('achievements')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Monthly Badges</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {badgeData.map((group) => (
          <View key={group.year} style={styles.yearSection}>
            <Text style={[styles.yearTitle, { color: colors.text }]}>{group.year} Badges</Text>
            
            <View style={[styles.gridContainer, { gap }]}>
              {group.badges.map((badge) => {
                const isAchieved = badge.achieved;
                
                // Unachieved badges get a monolithic, dark, sunken look
                const badgeColor = isAchieved ? badge.color : (theme === 'dark' ? '#1F2937' : '#E5E7EB');
                const badgeBorder = isAchieved ? badge.border : (theme === 'dark' ? '#374151' : '#D1D5DB');
                const iconColor = isAchieved ? '#FFF' : (theme === 'dark' ? '#4B5563' : '#9CA3AF');

                return (
                  <View key={badge.id} style={[styles.gridItem, { width: itemWidth }]}>
                    {/* Outer thick medal base */}
                    <View style={[
                      styles.badgeOuter,
                      {
                        backgroundColor: badgeColor,
                        borderColor: badgeBorder,
                        width: badgeSize,
                        height: badgeSize,
                        borderRadius: badgeSize / 2,
                      }
                    ]}>
                      
                      {/* Inner colorful circle */}
                      <View style={[
                        styles.badgeInner,
                        { 
                          backgroundColor: badgeColor,
                          width: innerSize,
                          height: innerSize,
                          borderRadius: innerSize / 2,
                        }
                      ]}>
                        
                        {/* 3D Glass Glare (Only show if achieved to make it pop) */}
                        {isAchieved && <View style={styles.glare} />}
                        
                        {/* Image Illustration */}
                        <View style={{ zIndex: 10, width: imageSize, height: imageSize, alignItems: 'center', justifyContent: 'center' }}>
                          {isAchieved ? (
                            <Image source={badge.image} style={{ width: imageSize, height: imageSize, transform: [{ scale: 1.6 }] }} resizeMode="cover" />
                          ) : (
                            <View style={{ opacity: 0.5, filter: 'grayscale(100%)' as any, width: imageSize, height: imageSize, alignItems: 'center', justifyContent: 'center' }}>
                              <Image source={badge.image} style={{ width: imageSize, height: imageSize, opacity: 0.2, transform: [{ scale: 1.6 }] }} resizeMode="cover" />
                            </View>
                          )}
                        </View>
                        
                      </View>
                    </View>
                    
                    <Text style={[
                      styles.monthText, 
                      { 
                        color: isAchieved ? colors.text : colors.textMuted,
                        fontWeight: isAchieved ? '800' : '600'
                      }
                    ]}>
                      {badge.month}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <View style={{height: 40}} />
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
    fontWeight: '800',
    color: '#1A1A24',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  yearSection: {
    marginBottom: 32,
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A24',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeInner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  glare: {
    position: 'absolute',
    top: 2,
    left: 8,
    right: 8,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    zIndex: 1,
  },
  iconShadow: {
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  monthText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
