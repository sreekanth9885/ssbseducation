// src/components/layout/Navbar.tsx
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const API = "https://ssbsapi.academicprojects.org";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  let timeout: any;

  useEffect(() => {
    axios
      .get(`${API}/notifications`)
      .then((res) => {
        setNotifications(res.data.data || res.data);
      })
      .catch(() => console.log("Notification fetch error"));
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // delay fixes click issue
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
      
      {/* Logo */}
      <NavLink to="/" className="font-bold text-lg text-blue-700">
        SSBS Education Society
      </NavLink>

      {/* Menu */}
      <ul className="flex gap-6 text-gray-700 items-center">

        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/courses">Courses</NavLink></li>
        <li><NavLink to="/staff">Faculty</NavLink></li>

        {/* 🔥 NOTIFICATIONS (FINAL FIX) */}
        <li
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Click → full page */}
          <span
            onClick={() => navigate("/notifications")}
            className="cursor-pointer hover:text-blue-600 py-2 block"
          >
            Notifications ▾
          </span>

          {/* Dropdown */}
          {showDropdown && (
            <div
              className="absolute left-0 top-full w-72 bg-white shadow-lg rounded border z-50"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {notifications.length === 0 ? (
                <p className="p-3 text-gray-500 text-sm">
                  No notifications
                </p>
              ) : (
                notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => navigate(`/notifications/${n.id}`)}
                    className="p-2 border-b hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {n.title}
                  </div>
                ))
              )}

              {/* ✅ VIEW ALL (NOW WORKS) */}
              <Link
                to="/notifications"
                className="block p-2 text-center text-blue-600 hover:bg-gray-100 font-medium"
              >
                View All →
              </Link>
            </div>
          )}
        </li>

        <li><NavLink to="/contact">Contact</NavLink></li>

      </ul>

      {/* Login */}
      <NavLink to="/login" className="text-blue-600 hover:underline">
        Sign In
      </NavLink>

    </div>
  );
};

export default Navbar;