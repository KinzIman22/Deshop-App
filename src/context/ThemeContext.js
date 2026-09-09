import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Colors mapping for light and dark modes
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      background: '#111827',
      cardBg: '#1F2937',
      textPrimary: '#F9FAFB',
      textSecondary: '#9CA3AF',
      borderColor: '#374151',
      dividerColor: '#374151',
      headerBg: '#1F2937',
      inputBg: '#374151',
      statusBar: 'light-content',
    } : {
      background: '#F3F4F6',
      cardBg: '#FFFFFF',
      textPrimary: '#1F2937',
      textSecondary: '#6B7280',
      borderColor: '#E5E7EB',
      dividerColor: '#F3F4F6',
      headerBg: '#FFFFFF',
      inputBg: '#F9FAFB',
      statusBar: 'dark-content',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Safe useTheme hook with fallback
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    // Fallback object taake undefined error ya app crash na ho
    return {
      isDarkMode: false,
      toggleTheme: () => {},
      colors: {
        background: '#F3F4F6',
        cardBg: '#FFFFFF',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        borderColor: '#E5E7EB',
        dividerColor: '#F3F4F6',
        headerBg: '#FFFFFF',
        inputBg: '#F9FAFB',
        statusBar: 'dark-content',
      }
    };
  }
  
  return context;
};