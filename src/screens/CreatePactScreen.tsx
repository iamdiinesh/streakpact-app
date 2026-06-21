import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface CreatePactScreenProps {
  onNavigate?: (screen: 'home') => void;
}

const CATEGORIES = [
  { id: '1', label: 'Sport', icon: 'fitness-outline' },
  { id: '2', label: 'Education', icon: 'book-outline' },
  { id: '3', label: 'Investing', icon: 'trending-up-outline' },
  { id: '4', label: 'Health', icon: 'heart-outline' },
  { id: '5', label: 'Creative', icon: 'color-palette-outline' },
];

const FRIENDS = [
  { id: '1', name: 'Alex Johnson', emoji: '🏃‍♂️' },
  { id: '2', name: 'Sarah Miller', emoji: '🧘‍♀️' },
  { id: '3', name: 'David Chen', emoji: '🏋️‍♂️' },
];

export default function CreatePactScreen({ onNavigate }: CreatePactScreenProps) {
  const { theme, colors } = useTheme();
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('Today');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [selectedFriend, setSelectedFriend] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCreate = () => {
    if (onNavigate) onNavigate('home');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('home')}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>New Pact</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Goal Input */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>What is your goal?</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <TextInput
                style={[styles.textInput, { color: colors.text }]}
                placeholder="e.g. Read 10 pages daily"
                placeholderTextColor={colors.textMuted}
                value={goal}
                onChangeText={setGoal}
              />
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
              {CATEGORIES.map(category => {
                const isSelected = selectedCategory === category.id;
                return (
                  <TouchableOpacity 
                    key={category.id} 
                    style={[
                      styles.categoryChip, 
                      { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }, 
                      isSelected && { backgroundColor: colors.primary }
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Ionicons 
                      name={category.icon as any} 
                      size={18} 
                      color={isSelected ? "#FFF" : colors.textSecondary} 
                    />
                    <Text style={[
                      styles.categoryText, 
                      { color: colors.textSecondary }, 
                      isSelected && { color: '#FFF' }
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Date and Time */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Schedule</Text>
            <View style={styles.rowInputs}>
              <TouchableOpacity 
                style={[styles.inputContainer, styles.flexInput, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}
                onPress={() => setShowCalendar(true)}
              >
                <Text style={[styles.smallLabel, { color: colors.textMuted }]}>Start Date</Text>
                <Text style={[styles.textInput, { color: colors.text }]}>
                  {startDate}
                </Text>
              </TouchableOpacity>
              <View style={[styles.inputContainer, styles.flexInput, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
                <Text style={[styles.smallLabel, { color: colors.textMuted }]}>Daily Deadline</Text>
                <TextInput
                  style={[styles.textInput, { color: colors.text }]}
                  placeholder="8:00 PM"
                  placeholderTextColor={colors.textMuted}
                  value={deadlineTime}
                  onChangeText={setDeadlineTime}
                />
              </View>
            </View>
          </View>

          {/* Friend Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Who are you doing this with?</Text>
            
            <View style={[styles.searchContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              <Ionicons name="search" size={20} color={colors.textMuted} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search friends..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
              {FRIENDS.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())).map((friend, index, arr) => {
                const isSelected = selectedFriend === friend.id;
                return (
                  <TouchableOpacity 
                    key={friend.id} 
                    style={[styles.friendRow, index === arr.length - 1 && { borderBottomWidth: 0 }, { borderBottomColor: colors.border }]}
                    onPress={() => setSelectedFriend(friend.id)}
                  >
                    <View style={[styles.friendAvatar, { backgroundColor: colors.background }]}>
                      <Text style={{fontSize: 20}}>{friend.emoji}</Text>
                    </View>
                    <Text style={[styles.friendName, { color: colors.text }]}>{friend.name}</Text>
                    <View style={[styles.radioCircle, { borderColor: colors.border }, isSelected && { borderColor: colors.primary }]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Streak Details Note */}
          <View style={[styles.infoBox, { backgroundColor: theme === 'dark' ? colors.primaryLight : '#E6EFFF' }]}>
            <Ionicons name="information-circle" size={20} color={theme === 'dark' ? colors.primary : '#0F6EFF'} />
            <Text style={[styles.infoText, { color: theme === 'dark' ? colors.primary : '#0F6EFF' }]}>
              You and your friend will both need to upload photo proof daily to keep the streak alive!
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: colors.primary }, !goal.trim() && { backgroundColor: colors.border, shadowOpacity: 0, elevation: 0 }]} 
            onPress={handleCreate}
            disabled={!goal.trim()}
          >
            <Text style={styles.createButtonText}>Create Pact</Text>
          </TouchableOpacity>
          
          <View style={{height: 40}} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.calendarModal, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <View style={styles.calendarHeader}>
              <Text style={[styles.calendarTitle, { color: colors.text }]}>Select Start Date</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.daysRow}>
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <Text key={i} style={[styles.dayLabel, { color: colors.textMuted }]}>{d}</Text>
              ))}
            </View>
            
            <View style={styles.datesGrid}>
              {/* Empty spaces to mock month start day */}
              {Array.from({length: 1}).map((_, i) => <View key={`empty-${i}`} style={styles.dateCell} />)}
              
              {Array.from({length: 30}).map((_, i) => {
                const day = i + 1;
                const dateStr = `June ${day}, 2026`;
                const isSelected = startDate === dateStr || (startDate === 'Today' && day === 21);
                return (
                  <TouchableOpacity 
                    key={day} 
                    style={[styles.dateCell, isSelected && { backgroundColor: colors.primary }]}
                    onPress={() => {
                      setStartDate(dateStr);
                      setShowCalendar(false);
                    }}
                  >
                    <Text style={[styles.dateText, { color: colors.text }, isSelected && { color: '#FFF' }]}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

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
    paddingTop: 8,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A24',
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  rowInputs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
  },
  flexInput: {
    flex: 1,
    marginHorizontal: 0,
    paddingVertical: 12,
  },
  smallLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#99A2AD',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  textInput: {
    fontSize: 16,
    color: '#1A1A24',
  },
  categoryScroll: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    backgroundColor: '#0F6EFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6E7781',
    marginLeft: 8,
  },
  categoryTextSelected: {
    color: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A24',
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    marginHorizontal: 24,
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
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A24',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#0F6EFF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0F6EFF',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E6EFFF',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#0F6EFF',
    fontWeight: '600',
    marginLeft: 12,
    lineHeight: 20,
  },
  createButton: {
    backgroundColor: '#0F6EFF',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 24,
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#E1E4E8',
    shadowOpacity: 0,
    elevation: 0,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  calendarModal: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A24',
  },
  daysRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#99A2AD',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dateCellSelected: {
    backgroundColor: '#0F6EFF',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A24',
  },
  dateTextSelected: {
    color: '#FFF',
  },
});