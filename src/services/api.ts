// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://ssbsapi.academicprojects.org/",
});

const apiFormData = axios.create({
  baseURL: API.defaults.baseURL,
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Add token to FormData requests as well
apiFormData.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API FormData Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

// ================= AUTH =================
export const loginAPI = (data: any) => API.post("api/login", data);
export const getMe = () => API.get("api/me");

// ================= DASHBOARD =================
export const getDashboardStats = () => API.get("/dashboard");

// ================= COURSES =================
export const getCourses = () => API.get("/courses");
export const createCourse = (data: any) => API.post("/courses", data);
export const deleteCourse = (id: number) => API.delete(`/courses?id=${id}`);

// ================= STUDENTS =================
export const getStudents = () => API.get("/students");
export const createStudent = (data: any) => API.post("/students", data);
export const deleteStudent = (id: number) => API.delete(`/students?id=${id}`);

// ================= STAFF =================
// Get all staff members
export const getStaff = () => API.get("/staff");

// Get single staff member by ID
export const getStaffById = (id: number) => API.get(`/staff/${id}`);

// Create staff member with photo
export const createStaff = (data: FormData) => {
  return apiFormData.post("/staff", data);
};

// Update staff member with photo
export const updateStaff = (id: number, data: FormData) => {
  if (!data.has("id")) {
    data.append("id", id.toString());
  }
  if (!data.has("_method")) {
    data.append("_method", "PUT");
  }

  return apiFormData.post("/staff", data);
};

// Delete staff member (will also delete their photo)
export const deleteStaff = (id: number) => API.delete(`/staff/${id}`);

// Alternative delete method (if you prefer query params)
export const deleteStaffWithQuery = (id: number) =>
  API.delete(`/staff?id=${id}`);

// Dedicated photo upload endpoint
export const uploadStaffPhoto = (id: number, photo: File) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("photo", photo);
  return apiFormData.post("/staff/upload-photo", formData);
};

// Delete staff photo only (without deleting the staff member)
export const deleteStaffPhoto = (id: number) =>
  API.delete(`/staff/${id}/photo`);

// Alternative photo deletion with query param
export const deleteStaffPhotoWithQuery = (id: number) =>
  API.delete(`/staff/delete-photo?id=${id}`);

// ================= NOTIFICATIONS =================
export const getNotifications = () => API.get("/notifications");
export const createNotification = (data: any) =>
  API.post("/notifications", data);
export const updateNotification = (id: number, data: any) =>
  API.put(`/notifications/${id}`, data);
export const deleteNotification = (id: number) =>
  API.delete(`/notifications/${id}`);

export default API;