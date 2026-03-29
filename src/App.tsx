// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./components/layout/Login";

const About = () => <div className="p-6">About Page</div>;
const Courses = () => <div className="p-6">Courses Page</div>;
const Staff = () => <div className="p-6">Staff Page</div>;
const Contact = () => <div className="p-6">Contact Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;