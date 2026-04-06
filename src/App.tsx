// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./components/layout/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./components/layout/PublicLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminStaff from "./pages/admin/AdminStaff";
import Notifications from "./pages/admin/notifications/Notifications";
import Staff from "./pages/Staff";
import NotificationsPage from "./pages/Notifications";
import NotificationDetail from "./pages/NotificationDetail";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
const Courses = () => <div className="p-6">Courses Page</div>;
const Contact = () => <div className="p-6">Contact Page</div>;

function App() {
  return (
    <div>  {/* ✅ Parent wrapper */}

      <BrowserRouter>
        <Routes>

          {/* 🌐 Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notifications/:id" element={<NotificationDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* 🔐 Auth */}
          <Route path="/login" element={<Login />} />

          {/* 🔐 Admin Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/settings" element={<div>Settings</div>} />
          </Route>

        </Routes>
      </BrowserRouter>

      {/* ✅ Footer now inside parent */}
      <Footer />

    </div>
  );
}
export default App;