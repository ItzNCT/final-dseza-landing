import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Interface định nghĩa thông tin người dùng
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

// Interface định nghĩa kiểu dữ liệu cho AuthContext
export interface AuthContextType {
  // State của người dùng hiện tại
  user: User | null;
  // Token xác thực
  token: string | null;
  // Trạng thái loading khi đang xử lý xác thực
  isLoading: boolean;
  // Hàm đăng nhập
  login: (token: string, userData: User) => void;
  // Hàm đăng xuất
  logout: () => void;
  // Đồng bộ thông tin người dùng từ backend dựa trên session cookie
  syncUser: () => Promise<void>;
}

// Tạo AuthContext với giá trị mặc định là undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props cho AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component để cung cấp context cho toàn bộ ứng dụng
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State quản lý thông tin người dùng
  const [user, setUser] = useState<User | null>(null);
  // State quản lý token xác thực
  const [token, setToken] = useState<string | null>(null);
  // State quản lý trạng thái loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API base (use full backend origin so cookies are sent to the correct domain)
  const API_BASE: string = (
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_TARGET)
    || 'https://dseza-backend.lndo.site'
  );

  // Hàm đồng bộ người dùng từ backend
  const syncUser = useCallback(async () => {
    try {
      const url = `${API_BASE}/api/auth/me`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        setUser(null);
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      if (data?.authenticated) {
        const mappedUser: User = {
          id: String(data.uid ?? ''),
          name: data.name ?? '',
          email: data.mail ?? '',
          role: Array.isArray(data.roles) && data.roles.length ? data.roles[0] : undefined,
        };
        setUser(mappedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.error('Failed to fetch user', error);
      throw error;
    }
  }, []);

  // Tự động đồng bộ khi app tải lần đầu
  useEffect(() => {
    syncUser().finally(() => setIsLoading(false));
  }, [syncUser]);

  // Hàm xử lý đăng nhập
  const login = (authToken: string, userData: User) => {
    // Do not persist tokens in browser storage. Server should set HttpOnly cookie.
    setToken(authToken);
    setUser(userData);
    console.log('User logged in successfully:', userData.name);
  };

  // Hàm xử lý đăng xuất
  const logout = () => {
    // Server should clear session cookie; frontend clears in-memory state.
    setToken(null);
    setUser(null);
    console.log('User logged out successfully');
  };

  // Giá trị được cung cấp cho các component con thông qua context
  const contextValue: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    syncUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext một cách dễ dàng
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Kiểm tra xem hook có được sử dụng trong AuthProvider không
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Export default AuthContext để có thể sử dụng trực tiếp nếu cần
export default AuthContext;
