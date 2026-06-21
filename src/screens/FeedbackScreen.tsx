import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

interface FeedbackScreenProps {
  onNavigate?: (screen: 'settings') => void;
}

export default function FeedbackScreen({ onNavigate }: FeedbackScreenProps) {
  const { theme, colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        if (onNavigate) onNavigate('settings');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]} onPress={() => onNavigate && onNavigate('settings')}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Send Feedback</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {submitted ? (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={80} color={theme === 'dark' ? colors.success : "#1D9E75"} />
              <Text style={[styles.successTitle, { color: colors.text }]}>Thank You!</Text>
              <Text style={[styles.successDesc, { color: colors.textSecondary }]}>Your feedback helps us make StreakPact better.</Text>
            </View>
          ) : (
            <View>
              <Text style={[styles.promptText, { color: colors.textSecondary }]}>
                Have a suggestion or found a bug? Let us know!
              </Text>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Name (Optional)</Text>
                <View style={[styles.singleLineContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
                  <TextInput
                    style={[styles.singleLineInput, { color: colors.text }]}
                    placeholder="Your name"
                    placeholderTextColor={colors.textMuted}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email Address</Text>
                <View style={[styles.singleLineContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
                  <TextInput
                    style={[styles.singleLineInput, { color: colors.text }]}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Feedback</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
                  <TextInput
                    style={[styles.textInput, { color: colors.text }]}
                    placeholder="Tell us your thoughts..."
                    placeholderTextColor={colors.textMuted}
                    multiline
                    textAlignVertical="top"
                    value={feedback}
                    onChangeText={setFeedback}
                  />
                </View>
              </View>

              <TouchableOpacity 
                style={[
                  styles.submitButton, 
                  { backgroundColor: colors.primary }, 
                  !feedback.trim() && { backgroundColor: colors.border, shadowOpacity: 0, elevation: 0 }
                ]} 
                onPress={handleSubmit}
                disabled={!feedback.trim()}
              >
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>
              
              <View style={{height: 40}} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
  promptText: {
    fontSize: 16,
    color: '#6E7781',
    lineHeight: 24,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A24',
    marginBottom: 8,
    marginLeft: 4,
  },
  singleLineContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  singleLineInput: {
    fontSize: 16,
    color: '#1A1A24',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
  },
  textInput: {
    height: 140,
    fontSize: 16,
    color: '#1A1A24',
  },
  submitButton: {
    backgroundColor: '#0F6EFF',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#0F6EFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#E1E4E8',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A24',
    marginTop: 24,
    marginBottom: 12,
  },
  successDesc: {
    fontSize: 16,
    color: '#6E7781',
    textAlign: 'center',
  },
});
