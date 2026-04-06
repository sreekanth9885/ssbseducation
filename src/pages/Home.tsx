import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />

      {/* About Preview */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">About Our College</h2>

        <p className="text-gray-600 max-w-3xl mx-auto">
          Our college is dedicated to providing quality education and shaping
          future leaders.
        </p>

        <Link
          to="/about"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </div>

      {/* Courses */}
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Courses</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-semibold">The Complete B.Ed. Program</h3>
            <p className="text-gray-600">Complete teacher training program</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          <div className="p-6 shadow rounded">
            <h4>Experienced Faculty</h4>
          </div>

          <div className="p-6 shadow rounded">
            <h4>Modern Infrastructure</h4>
          </div>

          <div className="p-6 shadow rounded">
            <h4>Placement Support</h4>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-blue-600 text-white py-10 text-center">
        <h2 className="text-xl font-bold">Latest Notifications</h2>

        <Link
          to="/notifications"
          className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded"
        >
          View Notifications
        </Link>
      </div>

    </div>
  );
};

export default Home;