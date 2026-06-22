import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image, Modal, Animated, PanResponder, Easing, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface MonthlyBadgesScreenProps {
  onNavigate?: (screen: 'achievements') => void;
}

export default function MonthlyBadgesScreen({ onNavigate }: MonthlyBadgesScreenProps) {
  const { theme, colors } = useTheme();
  const { width } = Dimensions.get('window');
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  
  // Calculate item width for 3 columns with gap
  const numColumns = 3;
  const paddingHorizontal = 24; // Must match scrollContent padding!
  const gap = 12;
  const availableWidth = width - (paddingHorizontal * 2) - (gap * (numColumns - 1));
  const itemWidth = Math.floor(availableWidth / numColumns) - 1; // -1 to prevent float rounding wraps

  // Dynamic badge sizing so it perfectly fits 3 columns even on smaller phones
  const badgeSize = Math.min(96, itemWidth);
  const innerSize = badgeSize * (80/96);
  const imageSize = innerSize;

  // Mock data using custom 3D cartoon character assets
  const badgeData = [
    {
      year: '2026',
      badges: [
        { id: '1', month: 'January', image: require('../../assets/badges/jan.png'), achieved: true },
        { id: '2', month: 'February', image: require('../../assets/badges/feb.png'), achieved: true },
        { id: '3', month: 'March', image: require('../../assets/badges/mar.png'), achieved: true },
        { id: '4', month: 'April', image: require('../../assets/badges/apr.png'), achieved: true },
        { id: '5', month: 'May', image: require('../../assets/badges/may.png'), achieved: true },
        { id: '6', month: 'June', image: require('../../assets/badges/jun.png'), achieved: true },
        { id: '7', month: 'July', image: require('../../assets/badges/jul.png'), achieved: false },
        { id: '8', month: 'August', image: require('../../assets/badges/aug.png'), achieved: false },
        { id: '9', month: 'September', image: require('../../assets/badges/sep.png'), achieved: false },
        { id: '10', month: 'October', image: require('../../assets/badges/oct.png'), achieved: false },
        { id: '11', month: 'November', image: require('../../assets/badges/nov.png'), achieved: false },
        { id: '12', month: 'December', image: require('../../assets/badges/dec.png'), achieved: false },
      ]
    },
    {
      year: '2025',
      badges: [
        { id: '25-1', month: 'January', image: require('../../assets/badges/jan.png'), achieved: true },
        { id: '25-2', month: 'February', image: require('../../assets/badges/feb.png'), achieved: true },
        { id: '25-3', month: 'March', image: require('../../assets/badges/mar.png'), achieved: true },
        { id: '25-4', month: 'April', image: require('../../assets/badges/apr.png'), achieved: true },
        { id: '25-5', month: 'May', image: require('../../assets/badges/may.png'), achieved: true },
        { id: '25-6', month: 'June', image: require('../../assets/badges/jun.png'), achieved: true },
        { id: '25-7', month: 'July', image: require('../../assets/badges/jul.png'), achieved: true },
        { id: '25-8', month: 'August', image: require('../../assets/badges/aug.png'), achieved: true },
        { id: '25-9', month: 'September', image: require('../../assets/badges/sep.png'), achieved: true },
        { id: '25-10', month: 'October', image: require('../../assets/badges/oct.png'), achieved: true },
        { id: '25-11', month: 'November', image: require('../../assets/badges/nov.png'), achieved: true },
        { id: '25-12', month: 'December', image: require('../../assets/badges/dec.png'), achieved: true },
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
                
                return (
                  <TouchableOpacity 
                    key={badge.id} 
                    style={[styles.gridItem, { width: itemWidth }]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedBadge(badge)}
                  >
                    <View style={[styles.badgeContainer, { width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 }]}>
                      {isAchieved ? (
                        <Image source={badge.image} style={{ width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 }} resizeMode="cover" />
                      ) : (
                        <View style={{ opacity: 0.35, filter: 'grayscale(100%)' as any, alignItems: 'center', justifyContent: 'center', borderRadius: badgeSize / 2, overflow: 'hidden' }}>
                          <Image source={badge.image} style={{ width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2 }} resizeMode="cover" />
                        </View>
                      )}
                      
                      {/* 3D Glass Glare Effect */}
                      <View style={[styles.glare, { borderTopLeftRadius: badgeSize / 2, borderTopRightRadius: badgeSize / 2 }]} />
                      
                      {/* 3D Inner Shadow/Border Effect */}
                      <View style={[styles.innerRing, { borderRadius: badgeSize / 2 }]} />
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
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={{height: 40}} />
      </ScrollView>

      {/* 3D Badge Modal */}
      {selectedBadge && (
        <Badge3DModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} theme={theme} colors={colors} />
      )}
    </SafeAreaView>
  );
}

const Badge3DModal = ({ badge, onClose, theme, colors }: any) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const autoRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(autoRotate, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          tension: 40,
          useNativeDriver: false
        }).start();
      }
    })
  ).current;

  const rotateX = pan.y.interpolate({ inputRange: [-200, 200], outputRange: ['-45deg', '45deg'], extrapolate: 'clamp' });
  const rotateYPan = pan.x.interpolate({ inputRange: [-200, 200], outputRange: ['-45deg', '45deg'], extrapolate: 'clamp' });
  const rotateYAuto = autoRotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const isAchieved = badge.achieved;

  return (
    <Modal transparent animationType="fade" visible={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContent} pointerEvents="box-none">
          <Text style={[styles.modalMonth, { color: '#FFF' }]}>{badge.month} Badge</Text>
          {isAchieved ? (
            <Text style={[styles.modalStatus, { color: '#60A5FA' }]}>Achieved! 🎉</Text>
          ) : (
            <Text style={[styles.modalStatus, { color: 'rgba(255, 255, 255, 0.5)' }]}>Not Achieved Yet</Text>
          )}

          <View {...panResponder.panHandlers} style={styles.modalBadgeCoinContainer}>
            {/* 3D Coin Edges for Thickness */}
            {[...Array(15)].map((_, i) => (
              <Animated.View
                key={`edge-${i}`}
                style={[
                  styles.modalBadgeCoinEdge,
                  {
                    backgroundColor: isAchieved ? '#B89020' : '#6B7280', // Darker gold/silver for edge depth
                    transform: [
                      { perspective: 1000 },
                      { rotateX },
                      { rotateY: rotateYAuto },
                      { rotateY: rotateYPan },
                      { translateZ: -i * 1.5 }
                    ]
                  }
                ]}
              />
            ))}

            {/* Back Face of the Coin */}
            <Animated.View
              style={[
                styles.modalBadgeCoinFace,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateX },
                    { rotateY: rotateYAuto },
                    { rotateY: rotateYPan },
                    { translateZ: -22.5 },
                    { rotateY: '180deg' }
                  ]
                }
              ]}
            >
              {isAchieved ? (
                <Image source={badge.image} style={styles.modalLargeImage} resizeMode="cover" />
              ) : (
                <View style={{ opacity: 0.35, filter: 'grayscale(100%)' as any, borderRadius: 120, overflow: 'hidden' }}>
                  <Image source={badge.image} style={styles.modalLargeImage} resizeMode="cover" />
                </View>
              )}
              <View style={styles.modalInnerRing} />
            </Animated.View>

            {/* Front Face of the Coin */}
            <Animated.View
              style={[
                styles.modalBadgeCoinFace,
                {
                  transform: [
                    { perspective: 1000 },
                    { rotateX },
                    { rotateY: rotateYAuto },
                    { rotateY: rotateYPan },
                    { translateZ: 0 }
                  ]
                }
              ]}
            >
              {isAchieved ? (
                <Image source={badge.image} style={styles.modalLargeImage} resizeMode="cover" />
              ) : (
                <View style={{ opacity: 0.35, filter: 'grayscale(100%)' as any, borderRadius: 120, overflow: 'hidden' }}>
                  <Image source={badge.image} style={styles.modalLargeImage} resizeMode="cover" />
                </View>
              )}
              <View style={styles.modalGlare} />
              <View style={styles.modalInnerRing} />
            </Animated.View>
          </View>
          
          <Text style={styles.dragHint}>Drag to interact in 3D</Text>
          
          <TouchableOpacity style={[styles.closeBtn, { backgroundColor: colors.card }]} onPress={onClose}>
            <Ionicons name="close" size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
    marginBottom: 20,
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  glare: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  innerRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
  },
  monthText: {
    fontSize: 15,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(10px)',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    width: '100%',
  },
  modalMonth: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  modalStatus: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 40,
  },
  modalBadgeCoinContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  modalBadgeCoinEdge: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  modalBadgeCoinFace: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  modalLargeImage: {
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  modalGlare: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  modalInnerRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderRightColor: 'rgba(0, 0, 0, 0.15)',
  },
  dragHint: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    opacity: 0.8,
    marginBottom: 40,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  closeBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
});
