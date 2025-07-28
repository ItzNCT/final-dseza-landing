import { GraphQLClient } from 'graphql-request';

// Lấy địa chỉ API từ biến môi trường với fallback
// Trong development mode sử dụng relative URL để tận dụng Vite proxy
const getEndpoint = (language?: string) => {
  const baseEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || 
    (import.meta.env.DEV ? '/graphql' : 'https://dseza-backend.lndo.site/graphql');
  
  // Nếu có language code, thêm vào URL
  if (language) {
    const urlParts = baseEndpoint.split('/graphql');
    return `${urlParts[0]}/${language}/graphql${urlParts[1] || ''}`;
  }
  
  return baseEndpoint;
};

// Tạo một đối tượng client mặc định (không có language)
export const apiClient = new GraphQLClient(getEndpoint());

// Tạo function để tạo client với language cụ thể
export const createLanguageClient = (language: string) => {
  return new GraphQLClient(getEndpoint(language));
};

// Tạo function để tạo client với language header thay vì URL
export const createLanguageClientWithHeader = (language: string) => {
  const client = new GraphQLClient(getEndpoint(), {
    headers: {
      'Accept-Language': language,
      'Content-Language': language,
    },
  });
  return client;
};

// Tạo sẵn client cho tiếng Anh
export const enApiClient = new GraphQLClient(getEndpoint('en'));

// Client cho tiếng Anh với header approach
export const enApiClientWithHeader = createLanguageClientWithHeader('en');

// Trong tương lai, chúng ta có thể thêm các cấu hình khác vào đây
// ví dụ như header cho việc xác thực (authentication).