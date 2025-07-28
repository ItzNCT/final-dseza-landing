// src/components/hero/NavigationBar.tsx
import React, { useRef, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import MegaMenu from './MegaMenu';
import NavigationMenuItem from './NavigationMenuItem';
import { useMultilingualMenu } from '@/api/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem as NavigationMenuItemType, MegaMenuContentType } from './types/megaMenu';
import type { MenuLinkWithSubtree } from '@/api/hooks';

const TOP_BAR_HEIGHT_STRING = "3rem"; 
const INITIAL_NAV_TOP_STRING = "9rem";
const SCROLL_THRESHOLD_PX = 96; 

// Skeleton component for loading state
const MenuItemSkeleton: React.FC = () => (
  <li className="px-4 py-2">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
    </div>
  </li>
);

// Function to map API data from GraphQL to NavigationMenuItemType
const mapApiDataToMenuItems = (apiMenuLinks: MenuLinkWithSubtree[]): NavigationMenuItemType[] => {
  return apiMenuLinks.map((linkItem) => {
    // Basic mapping from GraphQL structure to NavigationMenuItemType
    const navigationItem: NavigationMenuItemType = {
      title: linkItem.link.label,
      url: linkItem.link.url.path,
      translatable: false, // API data doesn't have this field, set default
    };

    // If the API item has subtree, create megaMenuConfig from subtree data
    if (linkItem.subtree && linkItem.subtree.length > 0) {
      // Create mega menu configuration from GraphQL subtree structure
      navigationItem.megaMenuConfig = {
        columns: [
          {
            title: linkItem.link.label, // Use parent title as column title
            titleEn: linkItem.link.label, // Fallback to same title
            contents: linkItem.subtree.map((level2Item) => {
              const content: MegaMenuContentType = {
                title: level2Item.link.label,
                titleEn: level2Item.link.label,
                url: level2Item.link.url.path,
              };

              // If level 2 has subtree (level 3), map them as items
              if (level2Item.subtree && level2Item.subtree.length > 0) {
                content.items = level2Item.subtree.map((level3Item) => {
                  const item = {
                    title: level3Item.link.label,
                    titleEn: level3Item.link.label,
                    url: level3Item.link.url.path,
                  };

                  // Note: Level 4 (level3Item.subtree) is available but not used in current MegaMenu structure
                  // The current MegaMenuContentType only supports 3 levels: contents -> items -> (no further nesting)
                  // If you need level 4, you would need to extend the MegaMenuContentType interface

                  return item;
                });
              }

              return content;
            }),
          },
        ],
      };
    }

    return navigationItem;
  });
};

const NavigationBar: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  
  // Use language context and multilingual menu hook
  const { language } = useLanguage();
  const { isLoading, isError, error, getMenuLinks, hasMenuData, viMenuLinks, enMenuLinks } = useMultilingualMenu();
  
  // Get menu links for current language
  const menuLinks = getMenuLinks(language);
  
  // Debug log to see multilingual menu data
  React.useEffect(() => {
    console.log('🔄 NavigationBar State:');
    console.log('  - isLoading:', isLoading);
    console.log('  - isError:', isError);
    console.log('  - error:', error?.message);
    console.log('  - hasMenuData:', hasMenuData);
    console.log('  - language:', language);
    console.log('  - menuLinks.length:', menuLinks.length);
    
    if (hasMenuData) {
      console.log('🌍 Multilingual Menu Data Available:');
      console.log('📋 VI Menu Links:', viMenuLinks.length);
      console.log('📋 EN Menu Links:', enMenuLinks.length);
      console.log('🔤 Current Language:', language);
      console.log('📋 Current Menu Links:', menuLinks.length);
    }
    
    if (isError && error) {
      console.error('❌ Navigation Menu Error:', error.message);
    }
  }, [isLoading, isError, error, hasMenuData, viMenuLinks, enMenuLinks, language, menuLinks]);
  
  // Map API data to the expected format for NavigationMenuItem components
  const menuItems: NavigationMenuItemType[] = isLoading || isError || !hasMenuData
    ? [] 
    : mapApiDataToMenuItems(menuLinks);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > SCROLL_THRESHOLD_PX);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (index: number) => {
    if (!menuItems[index]?.megaMenuConfig) {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(activeMenuIndex === index ? null : index);
    }
  };

  // Sử dụng các lớp glass đã chuẩn hóa
  const navClasses = isSticky ? "glass-sticky" : "glass-initial";

  // Error state - show fallback navigation
  if (isError) {
    return (
      <nav
        ref={navRef}
        className={cn(
          "left-0 right-0 z-30",
          navClasses,
          isSticky ? `fixed` : `absolute`
        )}
        style={{
          top: isSticky ? TOP_BAR_HEIGHT_STRING : INITIAL_NAV_TOP_STRING,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-4">
            <p className="text-red-500 text-sm">Failed to load navigation menu</p>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        "left-0 right-0 z-30", // Bỏ các lớp transition vì đã có trong .glass-base
        navClasses,
        isSticky ? `fixed` : `absolute`
      )}
      style={{
        top: isSticky ? TOP_BAR_HEIGHT_STRING : INITIAL_NAV_TOP_STRING,
      }}
    >
      <div className="container mx-auto px-6">
        <ul className="flex justify-center gap-x-8">
          {isLoading ? (
            // Show skeleton loading for menu items - simulate typical menu count
            Array.from({ length: 6 }, (_, index) => (
              <MenuItemSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            menuItems.map((item, index) => (
              <NavigationMenuItem
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                activeMenuIndex={activeMenuIndex}
                onMenuClick={handleMenuClick}
              />
            ))
          )}
        </ul>
      </div>

      {activeMenuIndex !== null && 
       !isLoading && 
       menuItems[activeMenuIndex]?.megaMenuConfig && (
        // MegaMenu sẽ kế thừa hiệu ứng glass từ navClasses của NavigationBar
        // Chỉ cần thêm style riêng cho MegaMenu nếu muốn (ví dụ: shadow)
        <MegaMenu config={menuItems[activeMenuIndex].megaMenuConfig!} />
      )}
    </nav>
  );
};

export default NavigationBar;