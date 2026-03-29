// src/pages/admin/Courses.tsx
import { useEffect, useState } from "react";
import { getCourses, createCourse, deleteCourse } from "../../services/api";

const AdminCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [name, setName] = useState("");

  const fetchCourses = async () => {
    const res = await getCourses();
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    await createCourse({ name });
    setName("");
    fetchCourses();
  };

  const handleDelete = async (id: number) => {
    await deleteCourse(id);
    fetchCourses();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Courses</h2>

      {/* Add Course */}
      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course name"
          className="border px-4 py-2 rounded w-64"
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
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(courses) &&
  courses.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.id}</td>
                <td>{c.name}</td>
                <td>
                  <button
                    onClick={() => handleDelete(c.id)}
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

export default AdminCourses;