// src/components/hero/MegaMenu.tsx
import React, { useState } from 'react';
import {
  User, Building2, Users, CircleDollarSign, BarChart, HomeIcon,
  Briefcase, FileText, Database, LineChart, BookOpen, GraduationCap, HeartHandshake,
  ChevronDown, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenuConfigType, MegaMenuContentType } from './types/megaMenu'; // Đã sửa: MegaMenuItem không được sử dụng trực tiếp ở đây
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, any> = {
  "general-partner": User,
  "chief-financial-officer": CircleDollarSign,
  "investor-relations": HeartHandshake,
  "business-development": Building2,
  "customer-relationship-management": Users,
  "real-estate": HomeIcon,
  "private-equity": Briefcase,
  "private-debt": FileText,
  "venture-capital": LineChart,
  "corporate-venture-capital": BookOpen,
  "hedge-fund": BarChart,
  "family-offices": Users,
  "ria": GraduationCap,
  "wealth-management": Database
};

type MegaMenuProps = {
  config: MegaMenuConfigType;
};

const MegaMenu = ({ config }: MegaMenuProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const { language } = useLanguage();
  const navigate = useNavigate();

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigation = (url: string) => {
    console.log(`🔗 MegaMenu Navigation: ${url} [Language: ${language}]`);
    navigate(url);
  };

  const gridCols = config.columns.length <= 2 ?
    `grid-cols-${config.columns.length}` :
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  // Helper function to get the appropriate title based on language
  const getLocalizedTitle = (title: string, titleEn?: string) => {
    if (language === 'en' && titleEn) {
      return titleEn;
    }
    return title;
  };

  return (
    <div
      className={cn(
        "mega-menu-container w-full",
        // Vì NavigationBar (cha) đã có border-bottom từ class glass-initial/glass-sticky,
        // MegaMenu có thể không cần border-top, hoặc nếu có thì cần rất mờ để không quá dày.
        // Tạm thời bỏ border-top ở đây, dựa vào border-bottom của NavigationBar.
        // "border-t border-white/20 dark:border-dseza-dark-border/30", 
        "shadow-xl" // Shadow riêng cho MegaMenu, có thể là shadow-2xl nếu muốn nổi bật hơn shadow-lg của Nav khi sticky
      )}
    >
      <div className="max-w-6xl mx-auto p-8">
        <div className={`grid ${gridCols} gap-8`}>
          {config.columns.map((column, colIndex) => (
            <div key={colIndex} className="menu-column">
              <h5 className="text-lg font-semibold pb-3 mb-3 border-b border-dseza-light-border/40 dark:border-dseza-dark-border/40">
                {getLocalizedTitle(column.title, column.titleEn)}
              </h5>
              <ul className="space-y-1">
                {column.contents.map((content, contentIndex) => {
                  const dropdownId = `col-${colIndex}-content-${contentIndex}`;
                  const isDropdownOpen = openDropdowns[dropdownId];
                  return (
                    <li key={contentIndex}>
                      <div
                        className={cn(
                          "flex items-center justify-between gap-3 py-3 px-4 rounded-lg",
                          "transition-all duration-200 ease-in-out",
                          "hover:bg-dseza-light-hover/80 dark:hover:bg-dseza-dark-hover/80",
                          "hover:scale-[1.02] hover:shadow-sm",
                          "border border-transparent",
                          "hover:border-dseza-light-primary/20 dark:hover:border-dseza-dark-primary/20",
                          { "cursor-pointer": !!content.items },
                          { "bg-dseza-light-hover/40 dark:bg-dseza-dark-hover/40": isDropdownOpen }
                        )}
                        onClick={() => content.items && toggleDropdown(dropdownId)}
                      >
                        <button
                          onClick={() => {
                            if (content.url) {
                              handleNavigation(content.url);
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3 flex-grow text-left",
                            "transition-colors duration-200",
                            "hover:text-dseza-light-primary dark:hover:text-dseza-dark-primary",
                            { "cursor-pointer": !content.items }
                          )}
                          disabled={!!content.items}
                        >
                          {content.iconName && iconMap[content.iconName] && (
                            <span className={cn(
                              "text-dseza-light-primary dark:text-dseza-dark-primary",
                              "transition-all duration-200",
                              "group-hover:scale-110"
                            )}>
                              {React.createElement(iconMap[content.iconName], { size: 20 })}
                            </span>
                          )}
                          <span className="font-medium">
                            {getLocalizedTitle(content.title, content.titleEn)}
                          </span>
                        </button>
                        {content.items && (
                          <button
                            aria-expanded={isDropdownOpen}
                            className={cn(
                              "p-1 rounded-full transition-all duration-200",
                              "hover:bg-dseza-light-primary/10 dark:hover:bg-dseza-dark-primary/10",
                              "text-dseza-light-primary dark:text-dseza-dark-primary",
                              "focus:outline-none focus:ring-2 focus:ring-dseza-light-primary/50 dark:focus:ring-dseza-dark-primary/50",
                              { "rotate-180": isDropdownOpen }
                            )}
                          >
                            <ChevronDown size={16} />
                          </button>
                        )}
                      </div>
                      {content.items && isDropdownOpen && (
                        <ul className="ml-6 mt-2 space-y-1 pl-6 border-l-2 border-dseza-light-primary/30 dark:border-dseza-dark-primary/30">
                          {content.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <button
                                onClick={() => handleNavigation(item.url)}
                                className={cn(
                                  "block py-2.5 px-4 rounded-lg text-sm w-full text-left",
                                  "transition-all duration-200 ease-in-out",
                                  "hover:bg-dseza-light-hover/60 dark:hover:bg-dseza-dark-hover/60",
                                  "hover:text-dseza-light-primary dark:hover:text-dseza-dark-primary",
                                  "hover:translate-x-1 hover:shadow-sm",
                                  "border border-transparent",
                                  "hover:border-dseza-light-primary/15 dark:hover:border-dseza-dark-primary/15",
                                  "text-dseza-light-secondary-text dark:text-dseza-dark-secondary-text",
                                  "hover:font-medium"
                                )}
                              >
                                {getLocalizedTitle(item.title, item.titleEn)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
              {column.specialContent && (
                <div className="mt-6 p-4 rounded-lg border border-dseza-light-border/30 dark:border-dseza-dark-border/30 bg-dseza-light-hover/20 dark:bg-dseza-dark-hover/20">
                  {column.specialContent}
                </div>
              )}
            </div>
          ))}
        </div>
        {config.featuredContent && (
          <div className="mt-8 border-t border-dseza-light-border/30 dark:border-dseza-dark-border/30 pt-6">
            {config.featuredContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;