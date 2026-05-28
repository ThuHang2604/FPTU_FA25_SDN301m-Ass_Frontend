import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import các trang (Pages)
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuizDetail from './pages/AdminQuizDetail'; // Trang quản lý câu hỏi

// Import Component bảo vệ Route Admin
import AdminRoute from './components/AdminRoute';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
      <Routes>
        {/* --- ROUTE MẶC ĐỊNH --- */}
        {/* Truy cập trang chủ '/' sẽ tự chuyển về trang Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* --- ROUTE PUBLIC (Ai cũng vào được) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- ROUTE USER (Cần đăng nhập - Logic check login nằm ở trang Dashboard/QuizPage hoặc thêm PrivateRoute nếu muốn chặt chẽ hơn) --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:id" element={<QuizPage />} />

        {/* --- ROUTE ADMIN (Chỉ Admin mới vào được) --- */}
        {/* Admin Dashboard: Quản lý danh sách Quiz */}
        <Route 
            path="/admin" 
            element={
                <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            } 
        />

        {/* Admin Quiz Detail: Quản lý câu hỏi trong 1 Quiz */}
        <Route 
            path="/admin/quiz/:id" 
            element={
                <AdminRoute>
                    <AdminQuizDetail />
                </AdminRoute>
            } 
        />
      </Routes>
    </Router>
   </>
  );
}

export default App;