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
    const initializeAuth = () => {
      try {
        // Lấy token từ localStorage
        const savedToken = localStorage.getItem('authToken');
        // Lấy thông tin user từ localStorage
        const savedUser = localStorage.getItem('userData');

        if (savedToken && savedUser) {
          // Parse thông tin user từ JSON string
          const parsedUser: User = JSON.parse(savedUser);
          
          // Cập nhật state với thông tin đã lưu
          setToken(savedToken);
          setUser(parsedUser);
        }
      } catch (error) {
        // Nếu có lỗi khi parse dữ liệu, xóa dữ liệu không hợp lệ
        console.error('Error parsing saved auth data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        // Kết thúc quá trình loading
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Hàm xử lý đăng nhập
  const login = (authToken: string, userData: User) => {
    try {
      // Lưu token vào localStorage
      localStorage.setItem('authToken', authToken);
      // Lưu thông tin user vào localStorage (convert thành JSON string)
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Cập nhật state
      setToken(authToken);
      setUser(userData);
      
      console.log('User logged in successfully:', userData.name);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  // Hàm xử lý đăng xuất
  const logout = () => {
    try {
      // Xóa token khỏi localStorage
      localStorage.removeItem('authToken');
      // Xóa thông tin user khỏi localStorage
      localStorage.removeItem('userData');
      
      // Reset state về null
      setToken(null);
      setUser(null);
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
