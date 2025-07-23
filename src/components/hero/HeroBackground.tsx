import React, { useState, useEffect } from "react";
import SocialBar from "./SocialBar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from "@/utils/translations";

// Define theme-aware tab data structure with both light and dark mode images
const tabsData = [
  {
    id: "tab1",
    titleKey: "heroBackground.tab1",
    images: {
      light: {
        main: "media/HeroBackground/Slide1light.png",
        thumbnail: "media/HeroBackground/Slide1light.png"
      },
      dark: {
        main: "media/HeroBackground/Slide1dark.png",
        thumbnail: "media/HeroBackground/Slide1dark.png"
      }
    }
  },
  {
    id: "tab2",
    titleKey: "heroBackground.tab2",
    images: {
      light: {
        main: "media/HeroBackground/Slide2light.png",
        thumbnail: "media/HeroBackground/Slide2light.png"
      },
      dark: {
        main: "media/HeroBackground/Slide2dark.png",
        thumbnail: "media/HeroBackground/Slide2dark.png"
      }
    }
  },
  {
    id: "tab3",
    titleKey: "heroBackground.tab3",
    images: {
      light: {
        main: "media/HeroBackground/Slide3light.png",
        thumbnail: "media/HeroBackground/Slide3light.png"
      },
      dark: {
        main: "media/HeroBackground/Slide3dark.png",
        thumbnail: "media/HeroBackground/Slide3dark.png"
      }
    }
  },
  {
    id: "tab4",
    titleKey: "heroBackground.tab4",
    images: {
      light: {
        main: "media/HeroBackground/Slide4light.png",
        thumbnail: "media/HeroBackground/Slide4light.png"
      },
      dark: {
        main: "media/HeroBackground/Slide4dark.png",
        thumbnail: "media/HeroBackground/Slide4dark.png"
      }
    }
  }
];

/**
 * Hero background component with dynamic image tabs and contrast overlay
 * Supports theme-aware images (different sets for dark and light modes)
 * Auto-slides every 5 seconds with pause on hover
 */
const HeroBackground: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [activeImage, setActiveImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  // Set initial image based on theme when component mounts
  useEffect(() => {
    const currentTheme = theme === "dark" ? "dark" : "light";
    const initialTab = tabsData[0];
    setActiveImage(initialTab.images[currentTheme].main);
  }, []);

  // Auto-slide functionality - changes tab every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab(currentTab => {
        const currentIndex = tabsData.findIndex(tab => tab.id === currentTab);
        const nextIndex = (currentIndex + 1) % tabsData.length;
        return tabsData[nextIndex].id;
      });
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle image transition when tab or theme changes
  useEffect(() => {
    const currentTheme = theme === "dark" ? "dark" : "light";
    const newImage = tabsData.find(tab => tab.id === activeTab)?.images[currentTheme].main || "";
    
    if (newImage !== activeImage && newImage) {
      setPrevImage(activeImage);
      setTransitioning(true);
      setActiveImage(newImage);
      
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 500); // Match transition duration
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, theme]);

  // Handle manual tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Temporarily pause auto-slide when user manually clicks
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const activeTitle = t(tabsData.find(tab => tab.id === activeTab)?.titleKey || "");
  const currentTheme = theme === "dark" ? "dark" : "light";

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Transition Background Images */}
      {transitioning && prevImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-0 animate-fade-out"
          style={{ backgroundImage: `url(${prevImage})` }}
        />
      )}
      <div 
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat z-0",
          transitioning ? "animate-fade-in" : ""
        )}
        style={{ backgroundImage: `url(${activeImage})` }}
      />
      
      {/* Contrast overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-1"></div>
      
      {/* Social Bar */}
      <SocialBar />
      
      {/* Image Thumbnails - Vertically centered on right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "w-36 transition-all duration-300 ease-in-out hover:scale-105 overflow-hidden rounded-md",
              tab.id === activeTab 
                ? theme === "dark" 
                  ? "border-2 border-dseza-dark-primary-accent" 
                  : "border-2 border-dseza-light-primary-accent"
                : "border-2 border-transparent"
            )}
          >
            <AspectRatio ratio={16/9}>
              <img 
                src={tab.images[currentTheme].thumbnail} 
                alt={t(tab.titleKey)}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </button>
        ))}
      </div>
      
      {/* Dynamic Title Overlay */}
      <div className="absolute bottom-16 left-16 z-10">
        <h1 className="text-6xl font-bold text-white text-shadow-lg transition-opacity duration-500">
          {activeTitle}
        </h1>
      </div>
    </div>
  );
};

export default HeroBackground;
