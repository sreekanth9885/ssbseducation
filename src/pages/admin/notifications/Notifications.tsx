import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  content: string;
}

export default function Notifications() {
  const API = "https://ssbsapi.academicprojects.org";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔥 Fetch Notifications
  const fetchNotifications = async () => {
    const res = await axios.get(`${API}/notifications`);
    setNotifications(res.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ✅ SUBMIT (ADD + UPDATE)
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      await axios.put(`${API}/notifications/${editingId}`, form);
    } else {
      await axios.post(`${API}/notifications`, form);
    }

    setForm({ title: "", content: "" });
    setEditingId(null);
    fetchNotifications();
  };

  // ✅ DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete?")) return;

    await axios.delete(`${API}/notifications/${id}`);
    fetchNotifications();
  };

  // ✅ EDIT
  const handleEdit = (n: Notification) => {
    setForm({ title: n.title, content: n.content });
    setEditingId(n.id);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {/* ✅ ADD BUTTON */}
      <button
        onClick={() => {
          setForm({ title: "", content: "" });
          setEditingId(null);
          setShowModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Notification
      </button>

      {/* ✅ TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full border rounded overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Content</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((n) => (
              <tr key={n.id} className="border-t">
                <td className="p-3">{n.title}</td>
                <td className="p-3">{n.content}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(n)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(n.id)}
                    className="bg-red-500 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Edit Notification" : "Add Notification"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-2"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Content"
              className="border p-2 w-full mb-2"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleSubmit();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}