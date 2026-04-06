// src/components/layout/Navbar.tsx
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";

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
  <div className="flex justify-between items-center px-8 py-3 shadow-md bg-white sticky top-0 z-50">
    
    {/* Logo */}
    <NavLink to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="Logo"
        className="w-16 h-16 object-contain"
      />

      <div className="leading-tight">
  <p className="font-bold text-blue-700 text-sm tracking-wide">
    SRI SADGURU
  </p>

  <p className="font-bold text-blue-700 text-sm tracking-wide">
    BANDAYAPPA SWAMY
  </p>

  <p className="text-xs text-orange-800 italic">
    EDUCATIONAL SOCIETY
  </p>
</div>
    </NavLink>

    {/* Menu */}
    <ul className="flex gap-6 text-gray-700 items-center ml-auto mr-30">

      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
          }
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/courses"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
          }
        >
          Courses
        </NavLink>
      </li>

      <li>
        <NavLink 
          to="/staff"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
          }
        >
          Faculty
        </NavLink>
      </li>

      {/* Notifications */}
      <li
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          onClick={() => navigate("/notifications")}
          className="cursor-pointer hover:text-blue-600 py-2 block"
        >
          Notifications ▾
        </span>

        {showDropdown && (
          <div className="absolute left-0 top-full w-72 bg-white shadow-lg rounded border z-50">
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

            <Link
              to="/notifications"
              className="block p-2 text-center text-blue-600 hover:bg-gray-100 font-medium"
            >
              View All →
            </Link>
          </div>
        )}
      </li>

      <li>
        <NavLink 
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
          }
        >
          Contact Us
        </NavLink>
      </li>

    </ul>

    {/* Login */}
    <NavLink 
      to="/login" 
      className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
    >
      Sign In
    </NavLink>

  </div>
);
};

export default Navbar;