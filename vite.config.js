import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Chạy frontend ở port 3000 cho giống đề bài
    proxy: {
      // Cấu hình để chuyển hướng các request API sang Backend port 5000
      '/auth': 'http://localhost:5000',
      '/quizzes': 'http://localhost:5000',
      '/questions': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
    }
  }
})