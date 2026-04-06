import { useEffect, useState } from "react";
import { getStaff } from "../services/api";

const Staff = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const res = await getStaff();
      console.log("Fetched faculty data:", res.data); // Debug log
      setFaculty(res.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // Handle image load error
  const handleImageError = (staffId: number) => {
    setImageErrors(prev => ({ ...prev, [staffId]: true }));
  };

  // Get image URL with proper path
  const getImageUrl = (staff: any) => {
    if (staff.photo_url) {
      // If photo_url already has full path
      if (staff.photo_url.startsWith('http')) {
        return staff.photo_url;
      }
      // If photo_url is relative path
      return `https://ssbsapi.academicprojects.org/${staff.photo_url}`;
    }
    if (staff.photo) {
      // If only photo filename exists
      return `https://ssbsapi.academicprojects.org/uploads/staff/${staff.photo}`;
    }
    return null;
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get random gradient color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-yellow-100 text-yellow-600',
      'bg-indigo-100 text-indigo-600',
      'bg-red-100 text-red-600',
      'bg-teal-100 text-teal-600',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading faculty members...</p>
        </div>
      </div>
    );
  }

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
        <p className="text-sm text-gray-400 mt-2">
          Total Faculty: {faculty.length}
        </p>
      </div>

      {/* Grid */}
      {faculty.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No faculty members found.</p>
        </div>
      ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {faculty.map((item) => {
              const imageUrl = getImageUrl(item);
              const showImage = imageUrl && !imageErrors[item.id];
              const avatarColor = getAvatarColor(item.name);
              const initials = getInitials(item.name);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 p-6 text-center cursor-pointer group"
                >
                  {/* Avatar / Image */}
                  <div className="relative mx-auto mb-4">
                    {showImage ? (
                      <div className="relative w-24 h-24 mx-auto">
                        <img
                          src={imageUrl}
                          alt={item.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 group-hover:border-blue-300 transition duration-300"
                          onError={() => handleImageError(item.id)}
                        />
                        {/* Online status indicator (optional) */}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    ) : (
                      <div className={`w-24 h-24 mx-auto rounded-full ${avatarColor} flex items-center justify-center text-2xl font-bold border-4 border-blue-100 group-hover:border-blue-300 transition duration-300`}>
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {item.name}
                  </h2>

                  {/* Designation */}
                  <p className="text-blue-600 text-sm mt-1 font-medium">
                    {item.designation || 'Faculty Member'}
                  </p>

                  {/* Department */}
                  <p className="text-gray-500 text-sm mt-1">
                    {item.department || 'General'}
                  </p>

                  {/* Button */}
                  <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition">
                    View Profile →
                  </button>
                </div>
              );
            })}
          </div>
      )}

      {/* Modal for detailed view */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-scaleIn">

            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              ×
            </button>

            <div className="p-6">
              {/* Avatar in modal */}
              <div className="flex justify-center mb-4">
                {(() => {
                  const imageUrl = getImageUrl(selected);
                  const showImage = imageUrl && !imageErrors[selected.id];
                  const avatarColor = getAvatarColor(selected.name);
                  const initials = getInitials(selected.name);

                  return showImage ? (
                    <img
                      src={imageUrl}
                      alt={selected.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                      onError={() => handleImageError(selected.id)}
                    />
                  ) : (
                    <div className={`w-32 h-32 rounded-full ${avatarColor} flex items-center justify-center text-4xl font-bold`}>
                      {initials}
                    </div>
                  );
                })()}
              </div>

              {/* Details */}
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {selected.name}
              </h2>

              <p className="text-center text-blue-600 mt-2 font-medium">
                {selected.designation || 'Faculty Member'}
              </p>

              <p className="text-center text-gray-500 mt-1">
                {selected.department || 'Department'}
              </p>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                {selected.email && (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-medium">📧 Email:</span>
                    <p className="text-blue-600 hover:underline">
                      {selected.email}
                    </p>
                  </div>
                )}

                {selected.phone && (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-medium">📞 Phone:</span>
                    <p className="text-blue-600 hover:underline">
                      {selected.phone}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-3 justify-center">

                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Staff;