import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
}

export default function ContactMessages() {
  const API = "http://localhost:8000";

  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchMessages = async (pageNum = 1) => {
    try {
      const res = await axios.get(`${API}/contact/paginate?page=${pageNum}`);

      setMessages(res.data.data || []);
      setTotal(res.data.total || 0);

    } catch (err) {
      console.log("Error fetching messages");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`${API}/contact/${id}`);
      fetchMessages(page); // reload current page
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <>
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="bg-white shadow p-4 rounded">

                <h2 className="font-bold text-blue-700">
                  {m.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {m.email} | {m.phone}
                </p>

                <p className="mt-2 text-gray-700">
                  {m.message}
                </p>

                {m.created_at && (
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(m.created_at).toLocaleString()}
                  </p>
                )}

                <button
                  onClick={() => handleDelete(m.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>

              </div>
            ))}
          </div>

          {/* ✅ PAGINATION OUTSIDE MAP */}
          <div className="flex justify-center gap-4 mt-6">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {page} of {totalPages || 1}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
}