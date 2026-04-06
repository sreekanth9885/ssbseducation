// AdminStaff.tsx
import { useEffect, useState, useRef } from "react";
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  uploadStaffPhoto,
  deleteStaffPhoto
} from "../../services/api";

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  photo: string | null;
  photo_url?: string;
}

export default function AdminStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoUploadRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await getStaff();
      setStaff(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
      alert("Failed to fetch staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle file selection for main form
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setPhotoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle individual photo upload for existing staff
  const handleIndividualPhotoUpload = async (staffId: number, file: File) => {
    try {
      setUploadingPhoto(staffId);
      const formData = new FormData();
      formData.append('photo', file);

      await uploadStaffPhoto(staffId, file);
      alert("Photo uploaded successfully!");
      fetchStaff(); // Refresh the list
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    } finally {
      setUploadingPhoto(null);
    }
  };

  // Handle individual photo deletion
  const handleIndividualPhotoDelete = async (staffId: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      await deleteStaffPhoto(staffId);
      alert("Photo deleted successfully!");
      fetchStaff(); // Refresh the list
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo");
    }
  };

  // Remove selected photo from form
  const removePhoto = () => {
    setPhotoFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add / Update staff
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('designation', form.designation);
      formData.append('department', form.department);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      if (editing) {
        await updateStaff(editing, formData);
        alert("Faculty updated successfully!");
      } else {
        await createStaff(formData);
        alert("Faculty added successfully!");
      }

      setShowModal(false);
      setEditing(null);
      setPhotoFile(null);
      setPreviewImage(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
      });

      fetchStaff();
    } catch (error: any) {
      console.error("Error saving staff:", error);
      alert(error.response?.data?.message || "Failed to save faculty");
    } finally {
      setLoading(false);
    }
  };

  // Delete staff
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this faculty? This will also delete their photo.")) return;

    try {
      setLoading(true);
      await deleteStaff(id);
      alert("Faculty deleted successfully!");
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete faculty");
    } finally {
      setLoading(false);
    }
  };

  // Edit staff
  const handleEdit = (s: Staff) => {
    setForm({
      name: s.name,
      email: s.email || "",
      phone: s.phone || "",
      designation: s.designation || "",
      department: s.department || "",
    });

    // If there's an existing photo, show it as preview
    if (s.photo_url) {
      setPreviewImage(s.photo_url);
    } else {
      setPreviewImage(null);
    }

    setPhotoFile(null);
    setEditing(s.id);
    setShowModal(true);
  };

  // Search Filter
  const filtered = staff.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Faculty Management</h2>

        <button
          onClick={() => {
            setEditing(null);
            setForm({
              name: "",
              email: "",
              phone: "",
              designation: "",
              department: "",
            });
            setPhotoFile(null);
            setPreviewImage(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition duration-200"
          disabled={loading}
        >
          + Add Faculty
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search faculty by name..."
        className="border px-3 py-2 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Photo</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  <div className="relative group">
                    {s.photo_url ? (
                      <img
                        src={`https://ssbsapi.academicprojects.org/${s.photo_url}`}
                        alt={s.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No img</span>
                      </div>
                    )}

                    {/* Hover overlay for photo actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(ref) => {
                          if (ref) {
                            const uploadRef = photoUploadRef;
                            // Store ref in a map or use different approach
                          }
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && s.id) {
                            handleIndividualPhotoUpload(s.id, file);
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file && s.id) {
                              handleIndividualPhotoUpload(s.id, file);
                            }
                          };
                          input.click();
                        }}
                        className="bg-blue-500 text-white rounded-full p-1 text-xs hover:bg-blue-600"
                        title="Upload photo"
                      >
                        📷
                      </button>
                      {s.photo_url && (
                        <button
                          onClick={() => handleIndividualPhotoDelete(s.id)}
                          className="bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                          title="Delete photo"
                        >
                          🗑️
                        </button>
                      )}
                    </div>

                    {uploadingPhoto === s.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-2 font-medium">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.phone}</td>
                <td className="p-2">{s.designation}</td>
                <td className="p-2">{s.department}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200 cursor-pointer"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 cursor-pointer"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No results */}
      {filtered.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No faculty members found
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editing ? "Edit Faculty" : "Add New Faculty"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="e.g., Professor, Lecturer"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.designation}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <input
                  type="text"
                  placeholder="e.g., Computer Science"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  onChange={handlePhotoChange}
                  className="border w-full p-2 rounded"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Max size: 5MB. Allowed: JPG, PNG, GIF
                </p>
              </div>

              {/* Photo Preview */}
              {previewImage && (
                <div className="mt-2">
                  <div className="relative inline-block">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setPreviewImage(null);
                    setPhotoFile(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-50 transition duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
                  disabled={loading}
                >
                  {loading ? "Saving..." : editing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}