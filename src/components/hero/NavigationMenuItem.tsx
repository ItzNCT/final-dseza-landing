import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import { MenuItem } from './types/megaMenu';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/utils/translations';
import { useNavigate } from 'react-router-dom';

type NavigationMenuItemProps = {
  item: MenuItem;
  index: number;
  activeMenuIndex: number | null;
  onMenuClick: (index: number) => void;
};

const NavigationMenuItem = ({ 
  item, 
  index, 
  activeMenuIndex, 
  onMenuClick 
}: NavigationMenuItemProps) => {
  const isActive = activeMenuIndex === index;
  const { language } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (item.megaMenuConfig) {
      e.preventDefault();
      onMenuClick(index);
    } else {
      // For regular menu items, use React Router navigation
      e.preventDefault();
      console.log(`🔗 Navigating to: ${item.url} [Language: ${language}]`);
      navigate(item.url);
    }
  };

  const getItemTitle = () => {
    if (item.translatable) {
      return t(item.title);
    } else if (language === 'en' && item.titleEn) {
      return item.titleEn;
    } else {
      // Fallback to item.title if it's not a key and no English version
      return typeof item.title === 'string' && !item.title.includes('.') ? item.title : t(item.title);
    }
  };

  return (
    <li className="py-4"> {/* Giữ py-4 để đảm bảo chiều cao nhất quán cho li */}
      <a 
        href={item.url}
        className={cn(
          "group relative flex items-center font-medium text-base transition-colors duration-300 ease-in-out px-1", // Thêm group và px-1 để underline không quá sát lề
          isActive 
            ? "text-dseza-light-primary-hover dark:text-dseza-dark-primary" 
            : "hover:text-dseza-light-primary dark:hover:text-dseza-dark-primary"
        )}
        onClick={handleClick}
      >
        {getItemTitle()}
        {item.megaMenuConfig && (
          <span className="ml-1 transition-transform duration-300 group-hover:translate-y-[-1px]"> {/* Hiệu ứng nhỏ cho icon */}
            {isActive ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        )}
        
        {/* Animated underline indicator */}
        <span 
          className={cn(
            "absolute -bottom-2 left-0 h-0.5 bg-dseza-light-primary dark:bg-dseza-dark-primary transition-all duration-300 ease-in-out",
            // Khi active, gạch chân đầy đủ và rõ ràng
            isActive ? "w-full opacity-100" : 
            // Khi hover (và không active), gạch chân xuất hiện với opacity thấp hơn và chỉ bằng chiều rộng nội dung chữ
            "group-hover:w-full group-hover:opacity-50 w-0 opacity-0" 
          )}
          style={{
            // Đảm bảo vị trí gạch chân nhất quán với padding của thẻ a
            left: '50%', 
            transform: 'translateX(-50%)',
            bottom: '-0.5rem' // Điều chỉnh vị trí gạch chân xuống một chút (tương đương -bottom-2)
          }}
        />
      </a>
    </li>
  );
};

export default NavigationMenuItem;