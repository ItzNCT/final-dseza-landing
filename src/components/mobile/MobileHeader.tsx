
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Map, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/translations";
import { useMultilingualMenu } from '@/api/hooks';
import type { MenuLinkWithSubtree } from '@/api/hooks';

// Type for mobile menu item (mapped from API data)
type MobileMenuItem = {
  id: string;
  title: string;
  url?: string;
  isExpandable?: boolean;
  items?: {
    heading: string;
    links: {
      title: string;
      url: string;
      children?: { title: string; url: string }[];
    }[];
  }[];
};

// Function to map API data to mobile menu structure
const mapApiDataToMobileMenu = (apiMenuLinks: MenuLinkWithSubtree[]): MobileMenuItem[] => {
  return apiMenuLinks.map((linkItem, index) => {
    const menuItem: MobileMenuItem = {
      id: `menu-${index}`,
      title: linkItem.link.label,
      url: linkItem.link.url.path,
      isExpandable: !!(linkItem.subtree && linkItem.subtree.length > 0),
    };

    // If has subtree, create expandable menu structure
    if (linkItem.subtree && linkItem.subtree.length > 0) {
      // Group level 2 items by categories or just put them all under one section
      menuItem.items = [{
        heading: linkItem.link.label, // Use parent title as heading
        links: linkItem.subtree.map((level2Item) => {
          const link: {
            title: string;
            url: string;
            children?: { title: string; url: string }[];
          } = {
            title: level2Item.link.label,
            url: level2Item.link.url.path,
          };

          // If level 2 has children (level 3), add them
          if (level2Item.subtree && level2Item.subtree.length > 0) {
            link.children = level2Item.subtree.map((level3Item) => ({
              title: level3Item.link.label,
              url: level3Item.link.url.path,
            }));
          }

          return link;
        })
      }];
    }

    return menuItem;
  });
};

// MenuItemSkeleton component for loading state
const MenuItemSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const skeletonBg = theme === "dark" ? "bg-dseza-dark-border" : "bg-dseza-light-border";
  
  return (
    <div className="mb-1">
      <div className="flex items-center justify-between w-full py-3 px-2">
        <Skeleton className={cn("h-6 w-32", skeletonBg)} />
        <Skeleton className={cn("h-4 w-4", skeletonBg)} />
      </div>
    </div>
  );
};

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use multilingual menu hook like desktop NavigationBar
  const { isLoading, isError, error, getMenuLinks, hasMenuData } = useMultilingualMenu();
  
  // Get menu links for current language
  const apiMenuLinks = getMenuLinks(language);
  
  // Map API data to mobile menu format
  const mobileMenuData: MobileMenuItem[] = isLoading || isError || !hasMenuData
    ? [] 
    : mapApiDataToMobileMenu(apiMenuLinks);

  // Debug log to see menu data
  React.useEffect(() => {
    console.log('📱 MobileHeader State:');
    console.log('  - isLoading:', isLoading);
    console.log('  - isError:', isError);
    console.log('  - error:', error?.message);
    console.log('  - hasMenuData:', hasMenuData);
    console.log('  - language:', language);
    console.log('  - apiMenuLinks.length:', apiMenuLinks.length);
    console.log('  - mobileMenuData.length:', mobileMenuData.length);
    
    if (isError && error) {
      console.error('❌ Mobile Menu Error:', error.message);
    }
  }, [isLoading, isError, error, hasMenuData, language, apiMenuLinks, mobileMenuData]);

  // Update date/time every minute
  useEffect(() => {
    const timerId = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(timerId);
  }, []);

  // Handle collapsible states
  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get theme-specific colors
  const getBgColor = () => theme === "dark" ? "bg-dseza-dark-main-bg" : "bg-white";
  const getTextColor = () => theme === "dark" ? "text-dseza-dark-main-text" : "text-dseza-light-main-text";
  const getSecondaryTextColor = () => theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text";
  const getBorderColor = () => theme === "dark" ? "border-dseza-dark-border" : "border-dseza-light-border";
  const getPrimaryColor = () => theme === "dark" ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent";
  const getPrimaryBgColor = () => theme === "dark" ? "bg-dseza-dark-primary-accent" : "bg-dseza-light-primary-accent";
  const getPrimaryHoverBgColor = () => theme === "dark" ? "hover:bg-dseza-dark-primary-accent-hover" : "hover:bg-dseza-light-primary-accent-hover";
  const getShadowColor = () => theme === "dark" ? "shadow-neutral-700" : "shadow-neutral-200";

  // Logo component - changes based on theme
  const Logo = () => (
    <a 
      href={`/${language}`} 
      className="flex items-center"
      aria-label="Về trang chủ"
    >
      <img
        src={theme === "dark" ? "/media/darklogo3.png" : "/media/lightlogo3.png"}
        alt="DSEZA Logo"
        className="h-[60px]"
      />
    </a>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full h-20 z-50",
          getBgColor(),
          getShadowColor(),
          "shadow-md"
        )}
      >
        <div className="flex items-center justify-between h-full px-4">
          <Logo />
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "p-2 rounded-md",
                  getTextColor(),
                  "focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" ? "focus:ring-dseza-dark-primary-accent" : "focus:ring-dseza-light-primary-accent"
                )}
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className={cn(
                "w-full sm:max-w-md p-0 border-none",
                getBgColor()
              )}
            >
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className={cn(
                  "flex items-center justify-between h-16 px-4",
                  getBgColor(),
                  getShadowColor(),
                  "shadow-md"
                )}>
                  <Logo />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className={cn(
                      "p-2 rounded-md",
                      getTextColor(),
                      "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      theme === "dark" ? "focus:ring-dseza-dark-primary-accent" : "focus:ring-dseza-light-primary-accent"
                    )}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Scrollable Menu Content */}
                <div className={cn(
                  "flex-1 overflow-y-auto p-6",
                  getBgColor()
                )}>
                  {/* Loading State */}
                  {isLoading && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className={cn("w-6 h-6 animate-spin mr-2", getPrimaryColor())} />
                        <span className={cn("text-sm", getSecondaryTextColor())}>
                          Đang tải menu...
                        </span>
                      </div>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <MenuItemSkeleton key={index} />
                      ))}
                    </div>
                  )}

                  {/* Error State */}
                  {isError && (
                    <div className="text-center py-8">
                      <p className={cn("text-sm mb-4", getTextColor())}>
                        Không thể tải menu từ server.
                      </p>
                      <p className={cn("text-xs", getSecondaryTextColor())}>
                        {error?.message || 'Đã xảy ra lỗi không xác định.'}
                      </p>
                    </div>
                  )}

                  {/* Menu Items - Only show when data is available */}
                  {!isLoading && !isError && hasMenuData && mobileMenuData.map((item) => (
                    <div key={item.id} className="mb-1">
                      {item.isExpandable ? (
                        <Collapsible
                          open={openCollapsibles[item.id]}
                          onOpenChange={() => toggleCollapsible(item.id)}
                          className="w-full"
                        >
                          <CollapsibleTrigger asChild>
                            <button 
                              className={cn(
                                "flex items-center justify-between w-full py-3 px-2",
                                getTextColor(),
                                "font-montserrat font-semibold text-lg",
                                getBorderColor(),
                                "border-b transition-colors duration-200",
                                theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent"
                              )}
                            >
                              <span>{item.title}</span>
                              <span className="transform transition-transform duration-200">
                                {openCollapsibles[item.id] ? "▼" : "▶"}
                              </span>
                            </button>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent className="pt-2 pb-3">
                            {item.items?.map((section, idx) => (
                              <div key={idx} className="mb-4">
                                <h3 className={cn(
                                  "pt-3 pb-2 px-4 font-montserrat font-medium text-base",
                                  getSecondaryTextColor()
                                )}>
                                  {section.heading}
                                </h3>
                                
                                <div className="space-y-1">
                                  {section.links.map((link, linkIdx) => (
                                    <div key={linkIdx}>
                                      {link.children ? (
                                        <>
                                          {/* Parent item with children */}
                                          <div className={cn(
                                            "py-2 pl-4 pr-2 font-inter text-sm",
                                            getTextColor()
                                          )}>
                                            {link.title}
                                          </div>
                                          {/* Child items */}
                                          <div className="pl-8">
                                            {link.children.map((child, childIdx) => (
                                              <a
                                                key={childIdx}
                                                href={child.url}
                                                className={cn(
                                                  "block py-2 pl-4 pr-2 font-inter text-sm transition-colors duration-200",
                                                  getTextColor(),
                                                  theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent"
                                                )}
                                                onClick={() => setIsMenuOpen(false)}
                                              >
                                                {child.title}
                                              </a>
                                            ))}
                                          </div>
                                        </>
                                      ) : (
                                        // Single item without children
                                        <a
                                          href={link.url}
                                          className={cn(
                                            "block py-2 pl-4 pr-2 font-inter text-sm transition-colors duration-200",
                                            getTextColor(),
                                            theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent"
                                          )}
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {link.title}
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a 
                          href={item.url}
                          className={cn(
                            "block py-3 px-2 transition-colors duration-200",
                            getTextColor(),
                            "font-montserrat font-semibold text-lg",
                            getBorderColor(),
                            "border-b",
                            theme === "dark" ? "hover:text-dseza-dark-primary-accent" : "hover:text-dseza-light-primary-accent"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.title}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Settings Footer */}
                <div className={cn(
                  "p-4 border-t",
                  getBorderColor(),
                  getBgColor()
                )}>
                  {/* Date/Time & Site Map */}
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "font-inter text-xs",
                      getSecondaryTextColor()
                    )}>
                      {formatDate(currentDateTime, true)}
                    </span>
                    
                    <a
                      href="https://dseza.danang.gov.vn/so-do-site"
                      className={cn(
                        "font-inter text-xs",
                        getPrimaryColor()
                      )}
                    >
                      <span className="flex items-center">
                        <Map className="w-3 h-3 mr-1" />
                        Sơ đồ site
                      </span>
                    </a>
                  </div>
                  
                  {/* Language & Theme Toggles */}
                  <div className="flex justify-between items-center mt-3">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  
                  {/* Login Button */}
                  <div className="mt-4">
                    <Button
                      className={cn(
                        "w-full py-2.5 px-5 font-inter font-medium text-base rounded-md",
                        getPrimaryBgColor(),
                        getPrimaryHoverBgColor(),
                        theme === "dark" ? "text-dseza-dark-main-bg" : "text-white"
                      )}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      {/* Spacer to offset the fixed header */}
      <div className="h-10"></div>
    </>
  );
};

// Language Switcher Component
const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  
  const getActiveClass = (lang: string) => {
    const isActive = language === lang;
    return cn(
      "font-inter text-sm transition-colors duration-200",
      isActive 
        ? (theme === "dark" ? "text-dseza-dark-primary-accent font-semibold" : "text-dseza-light-primary-accent font-semibold") 
        : (theme === "dark" ? "text-dseza-dark-secondary-text" : "text-dseza-light-secondary-text")
    );
  };
  
  return (
    <div className="flex items-center">
      <button 
        onClick={toggleLanguage} 
        className={getActiveClass("vi")}
      >
        Tiếng Việt
      </button>
      <span className={cn(
        "mx-1",
        theme === "dark" ? "text-dseza-dark-border" : "text-dseza-light-border"
      )}>
        /
      </span>
      <button 
        onClick={toggleLanguage} 
        className={getActiveClass("en")}
      >
        English
      </button>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "flex items-center space-x-1 font-inter text-sm transition-colors duration-200",
        isDark ? "text-dseza-dark-primary-accent" : "text-dseza-light-primary-accent"
      )}
    >
      {isDark ? (
        <>
          <span>Dark Mode</span>
          <span className="rounded-full w-4 h-4 bg-dseza-dark-primary-accent"></span>
        </>
      ) : (
        <>
          <span>Light Mode</span>
          <span className="rounded-full w-4 h-4 bg-dseza-light-primary-accent"></span>
        </>
      )}
    </button>
  );
};

export default MobileHeader;
