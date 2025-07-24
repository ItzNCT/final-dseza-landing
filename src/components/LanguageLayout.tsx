import React, { useEffect } from "react";
import { Outlet, useParams, Navigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

/**
 * LanguageLayout component that handles language routing
 * Reads the :lang parameter from URL and updates the LanguageContext
 */
const LanguageLayout: React.FC = () => {
  const { lang } = useParams();
  const { setLanguage } = useLanguage();
  const location = useLocation();

  // Validate language parameter
  const isValidLanguage = (lang: string | undefined): lang is "vi" | "en" => {
    return lang === "vi" || lang === "en";
  };

  useEffect(() => {
    // Update language context when URL parameter changes
    if (isValidLanguage(lang)) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  // Redirect invalid language codes to Vietnamese
  if (!isValidLanguage(lang)) {
    const newPath = `/vi${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={newPath} replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default LanguageLayout; 