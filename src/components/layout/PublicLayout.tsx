import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

interface Notification {
  id: number;
  title: string;
}

const PublicLayout = () => {
  const API = "https://ssbsapi.academicprojects.org";
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios.get(`${API}/notifications`).then((res) => {
      setNotifications(res.data.data || res.data);
    });
  }, []);

  return (
    <div>
      <Navbar />

      {/* 🔥 TICKER (ADDED HERE) */}
      <div className="bg-red-400 text-white py-2 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex gap-10 px-4">
          {notifications.map((n) => (
            <span
              key={n.id}
              className="cursor-pointer hover:underline"
            >
              📢 {n.title}
            </span>
          ))}
        </div>
      </div>

      <Outlet />
      <Footer />

    </div>
  );
};

export default PublicLayout;