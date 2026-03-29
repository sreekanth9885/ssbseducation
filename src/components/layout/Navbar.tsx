// src/components/layout/Navbar.tsx
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Staff", path: "/staff" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
      
      {/* Logo */}
      <h1 className="font-bold text-lg text-blue-700 cursor-pointer">
        Education Society
      </h1>

      {/* Menu */}
      <ul className="flex gap-6 text-gray-700">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `hover:text-blue-600 transition ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        <NavLink
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Sign In
        </NavLink>

        {/* <NavLink
          to="/register"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Sign Up
        </NavLink> */}
      </div>
    </div>
  );
};

export default Navbar;