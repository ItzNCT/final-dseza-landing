import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Download, Eye, FileText, ExternalLink } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MobileDocumentCardProps {
  document: {
    id: string;
    title: string;
    summary?: string;
    description?: string;
    category?: string;
    published_date?: string;
    file_url?: string;
    view_url?: string;
    file_size?: string;
    file_type?: string;
    is_featured?: boolean;
  };
}

/**
 * Mobile-optimized document card component
 * 
 * Features vertical layout with document info and action buttons
 * Optimized for touch interactions and small screens
 */
const MobileDocumentCard: React.FC<MobileDocumentCardProps> = ({ document }) => {
  const { theme } = useTheme();

  // Format date for mobile display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format file size
  const formatFileSize = (size: string) => {
    if (!size) return "";
    const sizeNum = parseInt(size);
    if (sizeNum < 1024) return `${sizeNum} B`;
    if (sizeNum < 1024 * 1024) return `${(sizeNum / 1024).toFixed(1)} KB`;
    return `${(sizeNum / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get file type color
  const getFileTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return theme === 'dark' ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100';
      case 'doc':
      case 'docx':
        return theme === 'dark' ? 'text-blue-400 bg-blue-900/20' : 'text-blue-600 bg-blue-100';
      case 'xls':
      case 'xlsx':
        return theme === 'dark' ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100';
      default:
        return theme === 'dark' ? 'text-gray-400 bg-gray-900/20' : 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md ${
      theme === 'dark' 
        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border hover:border-dseza-dark-primary/30' 
        : 'bg-white border-dseza-light-border hover:border-dseza-light-primary/30'
    }`}>
      
      {/* Main Content */}
      <div className="p-4 space-y-3">
        
        {/* Header Row - Category and Date */}
        <div className="flex items-center justify-between gap-2">
          {/* Category Badge */}
          {document.category && (
            <Badge 
              variant="secondary" 
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary/20 text-dseza-dark-primary border-dseza-dark-primary/30' 
                  : 'bg-dseza-light-primary/20 text-dseza-light-primary border-dseza-light-primary/30'
              }`}
            >
              {document.category}
            </Badge>
          )}
          
          {/* Date */}
          {document.published_date && (
            <div className={`flex items-center text-xs flex-shrink-0 ${
              theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
            }`}>
              <Calendar className="h-3 w-3 mr-1" />
              <time dateTime={document.published_date}>
                {formatDate(document.published_date)}
              </time>
            </div>
          )}
        </div>

        {/* Document Icon and Title */}
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 p-2 rounded-lg ${
            theme === 'dark' ? 'bg-dseza-dark-main-bg/50' : 'bg-dseza-light-main-bg/50'
          }`}>
            <FileText className={`h-5 w-5 ${
              theme === 'dark' ? 'text-dseza-dark-primary' : 'text-dseza-light-primary'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold line-clamp-2 leading-tight ${
              theme === 'dark' ? 'text-dseza-dark-main-text' : 'text-dseza-light-main-text'
            }`}>
              {document.title}
            </h3>
            
            {/* File Type and Size */}
            <div className="flex items-center gap-2 mt-1">
              {document.file_type && (
                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getFileTypeColor(document.file_type)}`}>
                  {document.file_type}
                </span>
              )}
              {document.file_size && (
                <span className={`text-xs ${
                  theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
                }`}>
                  {formatFileSize(document.file_size)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {(document.summary || document.description) && (
          <p className={`text-xs line-clamp-2 leading-relaxed ${
            theme === 'dark' ? 'text-dseza-dark-secondary-text' : 'text-dseza-light-secondary-text'
          }`}>
            {document.summary || document.description}
          </p>
        )}

        {/* Featured indicator */}
        {document.is_featured && (
          <Badge 
            variant="secondary" 
            className={`text-xs font-medium ${
              theme === 'dark' 
                ? 'bg-yellow-900/20 text-yellow-300 border-yellow-400/30' 
                : 'bg-yellow-100/90 text-yellow-800 border-yellow-300/30'
            }`}
          >
            Tài liệu quan trọng
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`border-t px-4 py-3 ${
        theme === 'dark' ? 'border-dseza-dark-border' : 'border-dseza-light-border'
      }`}>
        <div className="flex gap-2">
          
          {/* View Button */}
          {document.view_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`flex-1 h-9 text-xs ${
                theme === 'dark' 
                  ? 'border-dseza-dark-border text-dseza-dark-main-text hover:bg-dseza-dark-secondary-bg' 
                  : 'border-dseza-light-border text-dseza-light-main-text hover:bg-dseza-light-secondary-bg'
              }`}
            >
              <Link to={document.view_url} target="_blank" rel="noopener noreferrer">
                <Eye className="h-3 w-3 mr-1" />
                Xem
              </Link>
            </Button>
          )}

          {/* Download Button */}
          {document.file_url && (
            <Button
              asChild
              size="sm"
              className={`flex-1 h-9 text-xs ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                  : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
              }`}
            >
              <a 
                href={document.file_url} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Download className="h-3 w-3 mr-1" />
                Tải về
              </a>
            </Button>
          )}

          {/* External Link Button (if no file_url but has view_url) */}
          {!document.file_url && document.view_url && (
            <Button
              asChild
              size="sm"
              className={`flex-1 h-9 text-xs ${
                theme === 'dark' 
                  ? 'bg-dseza-dark-primary text-dseza-dark-main-bg hover:bg-dseza-dark-primary/80' 
                  : 'bg-dseza-light-primary text-white hover:bg-dseza-light-primary/80'
              }`}
            >
              <Link to={document.view_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Truy cập
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDocumentCard; 