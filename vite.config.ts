import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// ---------------------------------------------------------------------------
// ĐỔI GIÁ TRỊ NÀY NẾU BACKEND ĐỔI HOST / PORT
// Mặc định trỏ tới Lando: https://dseza-backend.lndo.site
// ---------------------------------------------------------------------------
const DEFAULT_API_TARGET = 'https://dseza-backend.lndo.site';

export default defineConfig(({ mode }) => {
  // Cho phép override bằng biến môi trường VITE_API_TARGET
  const env = loadEnv(mode, process.cwd(), '');
  const API_TARGET = env.VITE_API_TARGET || DEFAULT_API_TARGET;

  return {
    // ──────────────────────────────────────────────────────────────────────────
    // Dev-server
    // ──────────────────────────────────────────────────────────────────────────
    server: {
      host: '::',     // Cho phép truy cập qua LAN/IP
      port: 8080,
      proxy: {
        // Bỏ CORS cho mọi request JSON:API
        '/jsonapi': {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,   // đặt true nếu backend dùng SSL hợp lệ
        },
        // Proxy cho GraphQL endpoints
        '/graphql': {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
        },
        // Proxy cho custom API endpoints
        '/api': {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
        },
        // (tuỳ chọn) proxy luôn cả OAuth, REST khác…
        '/oauth': {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // ──────────────────────────────────────────────────────────────────────────
    // Plugins
    // ──────────────────────────────────────────────────────────────────────────
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),

    // ──────────────────────────────────────────────────────────────────────────
    // Aliases
    // ──────────────────────────────────────────────────────────────────────────
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // ──────────────────────────────────────────────────────────────────────────
    // Global constants (tuỳ chọn)
    // ──────────────────────────────────────────────────────────────────────────
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
