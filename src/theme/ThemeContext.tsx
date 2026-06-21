import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

export interface Colors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryLight: string;
  danger: string;
  dangerLight: string;
  success: string;
  successLight: string;
  icon: string;
}

const lightColors: Colors = {
  background: '#F7F9FC',
  card: '#FFF',
  text: '#1A1A24',
  textSecondary: '#6E7781',
  textMuted: '#99A2AD',
  border: '#E1E4E8',
  primary: '#0F6EFF',
  primaryLight: '#E6EFFF',
  danger: '#D85A30',
  dangerLight: '#FFF0EB',
  success: '#1D9E75',
  successLight: '#E8F5F1',
  icon: '#1A1A24',
};

const darkColors: Colors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#A0AAB5',
  textMuted: '#6E7781',
  border: '#2C2C2C',
  primary: '#3A8DFF',
  primaryLight: '#1A2B4C',
  danger: '#FF7F50',
  dangerLight: '#3D221A',
  success: '#2EBE8F',
  successLight: '#163328',
  icon: '#FFFFFF',
};

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: lightColors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
