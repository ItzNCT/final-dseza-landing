
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Detect language from URL pathname
 * Returns 'vi' for /vi/* paths, 'en' for /en/* paths, defaults to 'vi'
 */
const detectLanguageFromURL = (): Language => {
  const pathname = window.location.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  // Default to Vietnamese for /vi/* paths or any other paths
  return 'vi';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from URL
  const [language, setLanguageState] = useState<Language>(() => detectLanguageFromURL());
  const { i18n } = useTranslation();

  // Sync with react-i18next when language changes
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Listen for URL changes to automatically update language
  useEffect(() => {
    const handleLocationChange = () => {
      const detectedLang = detectLanguageFromURL();
      if (detectedLang !== language) {
        setLanguageState(detectedLang);
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleLocationChange);
    
    // Also check on mount in case the URL changed
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "vi" ? "en" : "vi";
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
