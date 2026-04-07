const CourseDetail = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-4">
        B.Ed - Bachelor of Education
      </h1>

      <p className="text-gray-600 mb-6">
        The Bachelor of Education (B.Ed) program is designed to prepare
        future teachers with modern teaching methodologies, classroom
        management skills, and subject expertise.
      </p>

      {/* Course Info Box */}
      <div className="bg-gray-100 p-6 rounded mb-6 space-y-2">
        <p><strong>Duration:</strong> 2 Years</p>
        <p><strong>Semesters:</strong> 4</p>
        <p><strong>Eligibility:</strong> Graduation</p>
        <p><strong>Mode:</strong> Offline</p>
      </div>

      {/* Button */}
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Apply Now
      </button>

    </div>
  );
};

export default CourseDetail;