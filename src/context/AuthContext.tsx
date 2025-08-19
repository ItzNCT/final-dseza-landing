import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // useEffect chạy khi component mount để kiểm tra token đã lưu trong localStorage
  useEffect(() => {
    // Cookie-based auth: rely on HttpOnly cookies set by server.
    // On app init, simply mark loading as complete. Optionally, fetch current user from a session endpoint.
    setIsLoading(false);
  }, []);

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
