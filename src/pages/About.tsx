import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <div className="bg-gray-150 py-16 text-center">
        <img src={logo} alt="College Logo" className="w-28 h-28 object-contain mx-auto mb-4"/>

        <h1 className="text-4xl font-bold text-blue-600">
            About Our College
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            We are committed to providing quality education and shaping future leaders.
            </p>
        </div>

      {/* Divider */}
      <div className="w-20 h-1 bg-blue-600 mx-auto my-8"></div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto px-6 py-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>

        <p className="text-gray-600 leading-relaxed">
          Our college has been a center of excellence in education for many years.
          We focus on academic growth, innovation, and student success. Our mission
          is to empower students with knowledge, skills, and values to succeed in life.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">

          <div className="p-6 shadow rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become a leading institution in education, research, and innovation.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower students with knowledge, skills, and values for success.
            </p>
          </div>

        </div>
      </div>

      {/* Principal Message */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h3 className="text-2xl font-bold mb-3">Message from Principal</h3>

        <p className="text-gray-600 leading-relaxed">
          Welcome to our institution. We strive to nurture talent and build a strong
          academic foundation for every student. Our goal is to prepare students
          for real-world challenges and future opportunities.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8">Why Choose Us</h3>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
              <h4 className="font-semibold">Experienced Faculty</h4>
              <p className="text-gray-600 mt-2">
                Highly qualified and dedicated teaching staff.
              </p>
            </div>

            <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
              <h4 className="font-semibold">Modern Infrastructure</h4>
              <p className="text-gray-600 mt-2">
                Well-equipped classrooms and laboratories.
              </p>
            </div>

            <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
              <h4 className="font-semibold">Placement Support</h4>
              <p className="text-gray-600 mt-2">
                Strong career guidance and placement assistance.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">

          <div>
            <h4 className="text-3xl font-bold">1000+</h4>
            <p>Students</p>
          </div>

          <div>
            <h4 className="text-3xl font-bold">50+</h4>
            <p>Courses</p>
          </div>

          <div>
            <h4 className="text-3xl font-bold">100+</h4>
            <p>Staff</p>
          </div>

          <div>
            <h4 className="text-3xl font-bold">20+</h4>
            <p>Years Experience</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;