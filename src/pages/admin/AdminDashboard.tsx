// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>({
    courses: 0,
    students: 0,
  });

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => console.log("API error"));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Courses</h3>
          <p className="text-3xl font-bold">{stats.courses}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Students</h3>
          <p className="text-3xl font-bold">{stats.students}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold">₹0</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Analytics</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart coming soon (Recharts)
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;