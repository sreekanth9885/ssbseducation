import { useEffect, useState } from "react";
import { getStaff, createStaff, deleteStaff, updateStaff } from "../../services/api";

export default function AdminStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
  });

  const fetchStaff = async () => {
    const res = await getStaff();
    setStaff(res.data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ✅ Add / Update
 const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (editing) {
    await updateStaff({ id: editing, ...form });
  } else {
    await createStaff(form);
  }

  setShowModal(false);
  setEditing(null);
  setForm({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
  });

  fetchStaff();
};
  // ✅ Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this faculty?")) return;
    await deleteStaff(id);
    fetchStaff();
  };

  // ✅ Edit
  const handleEdit = (s: any) => {
    setForm({
      name: s.name,
      email: s.email,
      phone: s.phone,
      designation: s.designation,
      department: s.department,
    });

    setEditing(s.id);
    setShowModal(true);
  };

  // ✅ Search Filter
  const filtered = staff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Faculty Management</h2>

        <button
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          + Add Faculty
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search faculty..."
        className="border px-3 py-2 mb-6 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Table */}
      <table className="w-full border bg-white shadow rounded mt-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Designation</th>
            <th className="p-2">Department</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">{s.phone}</td>
              <td className="p-2">{s.designation}</td>
              <td className="p-2">{s.department}</td>

              <td className="p-2 flex gap-2 justify-center">
                {/* ✏️ Edit */}
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>

                {/* 🗑 Delete */}
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🧾 MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">

            <h3 className="text-lg font-bold mb-4">
              {editing ? "Edit Faculty" : "Add Faculty"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                placeholder="Name"
                className="border w-full p-2 rounded"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="border w-full p-2 rounded"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                className="border w-full p-2 rounded"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Designation"
                className="border w-full p-2 rounded"
                value={form.designation}
                onChange={(e) =>
                  setForm({ ...form, designation: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Department"
                className="border w-full p-2 rounded"
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}