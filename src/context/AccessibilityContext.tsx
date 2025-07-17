import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  fontSize: number;
  isHighContrast: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const FONT_SIZES = [14, 16, 18, 20, 22, 24]; // Available font sizes
const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_INDEX = 0;
const MAX_FONT_INDEX = FONT_SIZES.length - 1;

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [fontSizeIndex, setFontSizeIndex] = useState(() => {
    const saved = localStorage.getItem('accessibility-font-size');
    const savedIndex = saved ? FONT_SIZES.indexOf(parseInt(saved, 10)) : -1;
    return savedIndex >= 0 ? savedIndex : FONT_SIZES.indexOf(DEFAULT_FONT_SIZE);
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true';
  });

  const fontSize = FONT_SIZES[fontSizeIndex];

  // Apply font size to document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('accessibility-font-size', fontSize.toString());
  }, [fontSize]);

  // Apply high contrast class to body
  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', isHighContrast.toString());
  }, [isHighContrast]);

  const increaseFontSize = () => {
    setFontSizeIndex(prev => Math.min(prev + 1, MAX_FONT_INDEX));
  };

  const decreaseFontSize = () => {
    setFontSizeIndex(prev => Math.max(prev - 1, MIN_FONT_INDEX));
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  const resetSettings = () => {
    setFontSizeIndex(FONT_SIZES.indexOf(DEFAULT_FONT_SIZE));
    setIsHighContrast(false);
  };

  const value: AccessibilityContextType = {
    fontSize,
    isHighContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    resetSettings,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 