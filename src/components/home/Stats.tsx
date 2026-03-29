// src/components/home/Stats.tsx
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/api";

const Stats = () => {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    placed: 0, // optional
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setStats({
          courses: res.data.courses || 0,
          students: res.data.students || 0,
          placed: 100, // static for now (or add API later)
        });
      })
      .catch(() => {
        console.log("Stats API error");
      })
      .finally(() => setLoading(false));
  }, []);

  const data = [
    { label: "Courses", value: stats.courses },
    { label: "Students Placed", value: stats.placed },
    { label: "Students", value: stats.students },
  ];

  return (
    <div className="flex justify-center gap-10 bg-white shadow p-6 -mt-2 max-w-xl mx-auto rounded-lg">
      {loading
        ? "Loading..."
        : data.map((item, i) => (
          <div key={i} className="text-center">
            <h3 className="text-2xl font-bold">
              {item.value}
            </h3>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
    </div>
  );
};

export default Stats;