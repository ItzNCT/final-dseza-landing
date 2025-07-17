import React, { useState } from 'react';
import { Plus, Minus, Contrast, RotateCcw, Settings, X } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AccessibilityPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { fontSize, isHighContrast, increaseFontSize, decreaseFontSize, toggleHighContrast, resetSettings } = useAccessibility();
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main toggle button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "rounded-full w-12 h-12 shadow-lg transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-opacity-50",
          theme === 'dark' 
            ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80 focus:ring-dseza-dark-primary' 
            : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80 focus:ring-dseza-light-primary',
          isExpanded && "rotate-180"
        )}
        aria-label={isExpanded ? "Đóng bảng điều khiển trợ năng" : "Mở bảng điều khiển trợ năng"}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
      </Button>

      {/* Expanded panel */}
      <div 
        className={cn(
          "absolute bottom-16 right-0 transition-all duration-300 origin-bottom-right",
          isExpanded 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div 
          className={cn(
            "p-4 rounded-lg shadow-xl border backdrop-blur-sm",
            theme === 'dark' 
              ? 'bg-dseza-dark-secondary-bg/95 border-dseza-dark-border' 
              : 'bg-white/95 border-dseza-light-border'
          )}
          role="dialog"
          aria-label="Bảng điều khiển trợ năng"
        >
          <h3 className={cn(
            "font-semibold mb-3 text-sm",
            theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
          )}>
            Trợ năng
          </h3>

          {/* Font size controls */}
          <div className="mb-4">
            <label className={cn(
              "block text-xs mb-2",
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            )}>
              Cỡ chữ: {fontSize}px
            </label>
            <div className="flex gap-2">
              <Button
                onClick={decreaseFontSize}
                size="sm"
                variant="outline"
                className={cn(
                  "w-8 h-8 p-0 transition-colors",
                  theme === 'dark'
                    ? 'border-dseza-dark-border hover:bg-dseza-dark-secondary-bg'
                    : 'border-dseza-light-border hover:bg-dseza-light-secondary-bg'
                )}
                aria-label="Giảm cỡ chữ"
                disabled={fontSize <= 14}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Button
                onClick={increaseFontSize}
                size="sm"
                variant="outline"
                className={cn(
                  "w-8 h-8 p-0 transition-colors",
                  theme === 'dark'
                    ? 'border-dseza-dark-border hover:bg-dseza-dark-secondary-bg'
                    : 'border-dseza-light-border hover:bg-dseza-light-secondary-bg'
                )}
                aria-label="Tăng cỡ chữ"
                disabled={fontSize >= 24}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* High contrast toggle */}
          <div className="mb-4">
            <Button
              onClick={toggleHighContrast}
              size="sm"
              variant={isHighContrast ? "default" : "outline"}
              className={cn(
                "w-full flex items-center gap-2 text-xs transition-colors",
                isHighContrast 
                  ? (theme === 'dark' 
                      ? 'bg-dseza-dark-primary hover:bg-dseza-dark-primary/80' 
                      : 'bg-dseza-light-primary hover:bg-dseza-light-primary/80')
                  : (theme === 'dark'
                      ? 'border-dseza-dark-border hover:bg-dseza-dark-secondary-bg'
                      : 'border-dseza-light-border hover:bg-dseza-light-secondary-bg')
              )}
              aria-label={isHighContrast ? "Tắt chế độ tương phản cao" : "Bật chế độ tương phản cao"}
              aria-pressed={isHighContrast}
            >
              <Contrast className="h-3 w-3" />
              {isHighContrast ? 'Tắt tương phản cao' : 'Bật tương phản cao'}
            </Button>
          </div>

          {/* Reset button */}
          <Button
            onClick={resetSettings}
            size="sm"
            variant="outline"
            className={cn(
              "w-full flex items-center gap-2 text-xs transition-colors",
              theme === 'dark'
                ? 'border-dseza-dark-border hover:bg-dseza-dark-secondary-bg text-dseza-dark-secondary-text'
                : 'border-dseza-light-border hover:bg-dseza-light-secondary-bg text-dseza-light-secondary-text'
            )}
            aria-label="Đặt lại cài đặt trợ năng về mặc định"
          >
            <RotateCcw className="h-3 w-3" />
            Đặt lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel; 