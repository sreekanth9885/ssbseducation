import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}
export default function NotificationsPage() {
  const API = "https://ssbsapi.academicprojects.org";
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    const res = await axios.get(`${API}/notifications`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📢 Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-700">
              {n.title}
            </h2>

            <p className="text-gray-700 mt-1">
              {n.content}
            </p>

            {n.created_at && (
              <p className="text-sm text-gray-400 mt-2">
                {new Date(n.created_at).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}