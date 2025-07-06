import { GraphQLClient } from 'graphql-request';

// Lấy địa chỉ API từ biến môi trường đã định nghĩa ở Bước 1
const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("VITE_GRAPHQL_ENDPOINT is not defined. Please check your .env.local file.");
}

// Tạo một đối tượng client để có thể tái sử dụng trong toàn bộ ứng dụng
export const apiClient = new GraphQLClient(endpoint);

// Trong tương lai, chúng ta có thể thêm các cấu hình khác vào đây
// ví dụ như header cho việc xác thực (authentication).