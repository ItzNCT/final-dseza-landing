import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveLayout; 