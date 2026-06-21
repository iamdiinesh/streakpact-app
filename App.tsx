import { useState } from 'react';
import { ThemeProvider } from './src/theme/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import ContactScreen from './src/screens/ContactScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';
import TermsScreen from './src/screens/TermsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import CreatePactScreen from './src/screens/CreatePactScreen';
import InboxScreen from './src/screens/InboxScreen';
import CompletedPactsScreen from './src/screens/CompletedPactsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'profile' | 'settings' | 'feedback' | 'contact' | 'privacy' | 'terms' | 'editProfile' | 'friends' | 'createPact' | 'inbox' | 'completed' | 'notifications'>('home');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (currentScreen === 'profile') {
    return <ProfileScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'settings') {
    return <SettingsScreen onNavigate={setCurrentScreen} onLogout={() => setIsLoggedIn(false)} />;
  }

  if (currentScreen === 'feedback') {
    return <FeedbackScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'contact') {
    return <ContactScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'privacy') {
    return <PrivacyScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'terms') {
    return <TermsScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'editProfile') {
    return <EditProfileScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'friends') {
    return <FriendsScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'createPact') {
    return <CreatePactScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'inbox') {
    return <InboxScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'completed') {
    return <CompletedPactsScreen onNavigate={setCurrentScreen} />;
  }

  if (currentScreen === 'notifications') {
    return <NotificationsScreen onNavigate={setCurrentScreen} />;
  }

  return <HomeScreen onNavigate={setCurrentScreen} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
