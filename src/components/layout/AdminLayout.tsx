// src/layouts/AdminLayout.tsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Courses", path: "/admin/courses" },
  { name: "Students", path: "/admin/students" },
  { name: "Faculty", path: "/admin/staff" },
  { name: "Notifications", path: "/admin/notifications" },
  { name: "Contact Messages", path: "/admin/contact-messages" },
  { name: "Settings", path: "/admin/settings" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* 🔷 Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        
        {/* Logo */}
        <div className="p-5 text-xl font-bold border-b border-blue-700">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "hover:bg-blue-800 text-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-700 text-sm text-gray-300">
          © 2026 Admin
        </div>
      </aside>

      {/* 🔶 Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* 🔝 Top Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-lg font-semibold text-gray-700">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            
            {/* Profile */}
            <div className="text-sm text-gray-600">
              Admin
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* 📦 Page Content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;