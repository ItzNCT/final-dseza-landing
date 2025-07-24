import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * RootRedirect component that redirects users to their preferred language
 * when they access the root URL without a language prefix
 */
const RootRedirect: React.FC = () => {
  const location = useLocation();

  // Get preferred language from localStorage or browser settings
  const getPreferredLanguage = (): "vi" | "en" => {
    // First check localStorage (from i18next)
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang === 'vi' || storedLang === 'en') {
      return storedLang;
    }

    // Then check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      return 'vi';
    }
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    // Default to Vietnamese
    return 'vi';
  };

  const preferredLang = getPreferredLanguage();
  const redirectPath = `/${preferredLang}${location.pathname}${location.search}${location.hash}`;

  return <Navigate to={redirectPath} replace />;
};

export default RootRedirect; 