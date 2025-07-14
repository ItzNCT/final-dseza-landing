import { GraphQLClient } from 'graphql-request';

// Lấy địa chỉ API từ biến môi trường với fallback
// Trong development mode sử dụng relative URL để tận dụng Vite proxy
const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || 
  (import.meta.env.DEV ? '/graphql' : 'https://dseza-backend.lndo.site/graphql');

// Tạo một đối tượng client để có thể tái sử dụng trong toàn bộ ứng dụng
export const apiClient = new GraphQLClient(endpoint);

// Trong tương lai, chúng ta có thể thêm các cấu hình khác vào đây
// ví dụ như header cho việc xác thực (authentication).