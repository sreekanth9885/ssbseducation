// src/pages/NotificationDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  content: string;
  created_at?: string;
}

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = "https://ssbsapi.academicprojects.org";

  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/notifications`)
      .then((res) => {
        const data = res.data.data || res.data;
        const found = data.find((n: Notification) => n.id == Number(id));
        setNotification(found);
      })
      .catch(() => console.log("Error loading notification"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!notification) {
    return (
      <div className="p-6 text-center text-red-500">
        Notification not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/notifications")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Notifications
      </button>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-3">
          {notification.title}
        </h1>

        {notification.created_at && (
          <p className="text-sm text-gray-500 mb-4">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        )}

        <p className="text-gray-700 leading-relaxed">
          {notification.content}
        </p>

      </div>

    </div>
  );
}