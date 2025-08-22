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
  // Trả về true nếu đã xác thực, false nếu không
  syncUser: () => Promise<boolean>;
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
      const url = new URL('/api/auth/me', API_BASE).toString();
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
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      setUser(null);
      console.error('Failed to fetch user', error);
      throw error;
    }
  }, []);

  // Tự động đồng bộ khi app tải lần đầu
  useEffect(() => {
    // Bỏ qua giá trị trả về; chỉ dùng để cập nhật state và hạ cờ loading
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
  const logout = async () => {
    try {
      // Call backend to clear HttpOnly cookies and server session
      const url = new URL('/api/auth/logout', API_BASE).toString();
      await fetch(url, { method: 'POST', credentials: 'include' }).catch(() => {});
    } finally {
      // Clear in-memory auth state
      setToken(null);
      setUser(null);

      // Best-effort: clear non-HttpOnly cookies for this origin
      try {
        const cookieNames = document.cookie.split(';').map(c => c.split('=')[0]?.trim()).filter(Boolean);
        const topLevelDomain = (() => {
          const parts = location.hostname.split('.');
          if (parts.length >= 2) return '.' + parts.slice(-2).join('.');
          return undefined;
        })();
        for (const name of cookieNames) {
          // current host
          document.cookie = `${name}=; Max-Age=0; path=/`;
          // top-level domain (for shared cookies like .lndo.site or .danang.gov.vn)
          if (topLevelDomain) {
            document.cookie = `${name}=; Max-Age=0; path=/; domain=${topLevelDomain}`;
          }
        }
      } catch {}

      // Clear Web Cache Storage and Storage APIs
      try {
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(names.map(n => caches.delete(n)));
        }
      } catch {}
      try { sessionStorage.clear(); } catch {}
      try { localStorage.clear(); } catch {}

      // Redirect after logout (default to language homepage). Can be overridden by env.
      try {
        const path = window.location.pathname;
        const langFromPath = /^\/(en|vi)(\/|$)/.exec(path)?.[1] || 'vi';
        const redirectPref = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_LOGOUT_REDIRECT) || 'root';

        if (typeof redirectPref === 'string' && redirectPref.startsWith('http')) {
          window.location.replace(redirectPref);
        } else if (redirectPref === 'login') {
          window.location.replace(`/${langFromPath}/auth/login`);
        } else {
          // 'root' or anything else -> send to language root
          window.location.replace(`/${langFromPath}`);
        }
      } catch {
        window.location.replace('/vi');
      }
    }
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
