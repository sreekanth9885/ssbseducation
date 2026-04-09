import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const API = "http://localhost:8000";

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
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-10 text-center">
        Contact Us
      </h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE - DETAILS */}
        <div className="space-y-6">

          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-600">
              Sri Sadguru Bandayappa Swamy Educational Society Bichkunda <br />
              Banswada-Bichkunda Rd, Bichkunda, Telangana 503306
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">9014339319, 9160685912</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">ssbsbedcollege@gmail.com</p>
          </div>

          {/* MAP */}
          <div className="mt-4">
            <iframe
              title="college location"
              src="https://maps.google.com/maps?q=Bichkunda%20Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64 rounded border"
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* RIGHT SIDE - FORM */}
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
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;