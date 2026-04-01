import { useEffect, useState } from "react";
import { getStaff } from "../services/api";

const Staff = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const fetchFaculty = async () => {
    const res = await getStaff();
    setFaculty(res.data);
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">
          Meet Our Faculty
        </h1>
        <p className="text-gray-500 mt-3">
          Experienced educators shaping future leaders
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {faculty.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-6 text-center cursor-pointer"
          >

            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
              {item.name?.charAt(0)}
            </div>

            {/* Name */}
            <h2 className="text-lg font-semibold text-gray-800">
              {item.name}
            </h2>

            {/* Designation */}
            <p className="text-blue-600 text-sm mt-1">
              {item.designation}
            </p>

            {/* Department */}
            <p className="text-gray-500 text-sm mt-1">
              {item.department}
            </p>

            {/* Button */}
            <button className="mt-4 text-sm text-blue-600 hover:underline">
              View Profile
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>

            {/* Avatar */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
              {selected.name?.charAt(0)}
            </div>

            {/* Details */}
            <h2 className="text-xl font-semibold text-center text-gray-800">
              {selected.name}
            </h2>

            <p className="text-center text-blue-600 mt-1">
              {selected.designation}
            </p>

            <p className="text-center text-gray-500 mt-1">
              {selected.department}
            </p>

            <div className="mt-4 text-sm text-gray-600 text-center space-y-1">
              {selected.email && <p>Email: {selected.email}</p>}
              {selected.phone && <p>Phone: {selected.phone}</p>}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Staff;