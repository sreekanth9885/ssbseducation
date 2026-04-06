import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const API = "https://ssbsapi.academicprojects.org";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/contact`, form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>

      </form>

    </div>
  );
};

export default Contact;