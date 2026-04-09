  import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

interface Notification {
  id: number;
  title: string;
  content?: string;
}

const PublicLayout = () => {
  const API = "https://ssbsapi.academicprojects.org";
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    axios.get(`${API}/notifications`).then((res) => {
      const data = res.data.data || res.data;
      setNotifications(data.slice(0, 5));
    });
  }, []);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setPosition((prev) => prev - 1);
    }, 20); // speed

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div>
      <Navbar />

      {/* 🔥 TICKER */}
      <div
        className="bg-red-500 text-white py-2 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-10 whitespace-nowrap px-4"
          style={{
            transform: `translateX(${position}px)`,
          }}
        >
          {notifications.concat(notifications).map((n, index) => (
            <span
              key={index}
              className="cursor-pointer hover:underline"
              onClick={() => navigate(`/notifications/${n.id}`)}
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