import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface SettingsScreenProps {
  onNavigate?: (screen: 'home' | 'profile' | 'settings' | 'feedback' | 'contact' | 'privacy' | 'terms') => void;
  onLogout?: () => void;
}

export default function SettingsScreen({ onNavigate, onLogout }: SettingsScreenProps) {
  const { theme, colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('profile')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={{ width: 44 }} /> {/* Spacer to center title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Support & Feedback */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support & Feedback</Text>
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={() => onNavigate && onNavigate('contact')}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="help-circle-outline" size={20} color={theme === 'dark' ? colors.primary : "#0F6EFF"} />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>Help Center & Contact</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={() => onNavigate && onNavigate('feedback')}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme === 'dark' ? colors.primary : "#0F6EFF"} />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>Send Feedback</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="star-outline" size={20} color={theme === 'dark' ? colors.primary : "#0F6EFF"} />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>Rate Us on Play Store</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal & Compliance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Legal & Privacy</Text>
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={() => onNavigate && onNavigate('privacy')}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#1D9E75" />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]} onPress={() => onNavigate && onNavigate('terms')}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="document-text-outline" size={20} color="#1D9E75" />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Account Actions</Text>
          <View style={[styles.card, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
            <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={onLogout}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              </View>
              <Text style={[styles.rowText, { color: colors.danger }]}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
              <View style={[styles.rowIcon, { backgroundColor: colors.background }]}>
                <Ionicons name="trash-outline" size={20} color={colors.danger} />
              </View>
              <Text style={[styles.rowText, { color: colors.danger }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    fontWeight: '700',
    color: '#1A1A24',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E7781',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A24',
  },
});
