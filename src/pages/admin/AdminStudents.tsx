// src/pages/admin/Students.tsx
import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  deleteStudent,
} from "../../services/api";

const AdminStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async () => {
    if (!form.name || !form.email) return;

    await createStudent(form);
    setForm({ name: "", email: "" });
    fetchStudents();
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Students</h2>

      {/* Form */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border px-4 py-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(students) &&
              students.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudents;