// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://ssbsapi.academicprojects.org/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const loginAPI = (data: any) => API.post("api/login", data);
export const getMe = () => API.get("api/me");
// DASHBOARD
export const getDashboardStats = () => API.get("/dashboard");

// COURSES
export const getCourses = () => API.get("/courses");
export const createCourse = (data: any) => API.post("/courses", data);
export const deleteCourse = (id: number) => API.delete(`/courses?id=${id}`);
export const getStudents = () => API.get("/students");
export const createStudent = (data: any) => API.post("/students", data);
export const deleteStudent = (id: number) => API.delete(`/students?id=${id}`);
export default API;