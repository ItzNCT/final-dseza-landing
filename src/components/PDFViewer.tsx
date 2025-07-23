import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface PDFViewerProps {
  src: string;
  title?: string;
  description?: string;
  className?: string;
  height?: string;
  showControls?: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  src,
  title = 'PDF Document',
  description = '',
  className = '',
  height = '800px',
  showControls = true
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  const handlePrint = () => {
    window.open(src, '_blank');
  };

  // Theme-based styles
  const wrapperStyle = {
    margin: '2rem 0',
    border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  const headerStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
    padding: '1rem',
    borderBottom: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
    color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const contentStyle = {
    position: 'relative' as const,
    width: '100%',
    height,
    backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'white',
    display: error ? 'none' : 'block',
    opacity: loading ? 0 : 1,
    transition: 'opacity 0.3s ease'
  };

  const controlsStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb',
    padding: '1rem',
    borderTop: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
    display: showControls ? 'flex' : 'none',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const
  };

  return (
    <div style={wrapperStyle} className={className}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .pdf-loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📄 {title}</span>
          <span style={{
            fontSize: '0.75rem',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            fontWeight: 'normal'
          }}>
            PDF Document
          </span>
        </div>
        {description && (
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {description}
          </div>
        )}
      </div>

      <div style={contentStyle}>
        <iframe
          src={`${src}#view=FitH&toolbar=1&navpanes=1&scrollbar=1&zoom=page-width`}
          style={iframeStyle}
          title={title}
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
        
        {loading && !error && (
          <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            fontSize: '0.875rem'
          }}>
            <div className="pdf-loading-spinner"></div>
            Đang tải PDF...
          </div>
        )}

        {error && (
          <div style={{
            padding: '1rem',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            backgroundColor: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.5)',
            margin: '1rem',
            textAlign: 'center' as const
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.25rem' }}>📄</span>
              <h4 style={{
                fontWeight: '600',
                color: theme === 'dark' ? '#fbbf24' : '#d97706',
                margin: 0
              }}>
                Không thể hiển thị PDF?
              </h4>
            </div>
            <p style={{
              color: theme === 'dark' ? '#fde68a' : '#92400e',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Trình duyệt của bạn có thể không hỗ trợ hiển thị PDF. Bạn có thể tải xuống hoặc mở trong tab mới để xem.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href={src} 
                download 
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
                  color: 'white',
                  border: `1px solid ${theme === 'dark' ? '#3b82f6' : '#2563eb'}`,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <span>💾</span> Tải xuống PDF
              </a>
              <a 
                href={src} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: theme === 'dark' ? '#4b5563' : '#ffffff',
                  color: theme === 'dark' ? '#f3f4f6' : '#374151',
                  border: `1px solid ${theme === 'dark' ? '#6b7280' : '#d1d5db'}`,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <span>🔗</span> Mở trong tab mới
              </a>
            </div>
          </div>
        )}
      </div>

      {showControls && (
        <div style={controlsStyle}>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: theme === 'dark' ? '#4b5563' : '#ffffff',
              color: theme === 'dark' ? '#f3f4f6' : '#374151',
              border: `1px solid ${theme === 'dark' ? '#6b7280' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#6b7280' : '#f3f4f6';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#4b5563' : '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>🔍</span> Xem toàn màn hình
          </a>
          
          <a 
            href={src} 
            download
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
              color: 'white',
              border: `1px solid ${theme === 'dark' ? '#3b82f6' : '#2563eb'}`,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2563eb' : '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
            }}
          >
            <span>💾</span> Tải xuống
          </a>
          
          <button 
            onClick={handlePrint}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: theme === 'dark' ? '#4b5563' : '#ffffff',
              color: theme === 'dark' ? '#f3f4f6' : '#374151',
              border: `1px solid ${theme === 'dark' ? '#6b7280' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#6b7280' : '#f3f4f6';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#4b5563' : '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>🖨️</span> In
          </button>
        </div>
      )}
         </div>
   );
};

export default PDFViewer; 