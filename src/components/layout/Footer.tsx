const Footer = () => {
  return (
    <div>

      {/* 🔶 Top CTA Section */}
      <div className="bg-orange-500 text-white py-6 px-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            THEREFORE ALWAYS FREE FROM REPETITION
          </h2>
          <p className="text-sm mt-1">
            There are many variations of passages of Lorem Ipsum available, 
            but the majority have suffered alteration in some form, by injected humour
          </p>
        </div>

        <button className="mt-4 md:mt-0 border border-white px-5 py-2 rounded hover:bg-white hover:text-orange-500">
          Book This Course
        </button>
      </div>

      {/* 🔷 Main Footer */}
      <div className="bg-blue-900 text-white py-10 px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Subjects */}
          <div>
            <h3 className="font-semibold mb-3">SUBJECTS</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>Telugu</li>
              <li>Hindi</li>
              <li>Bio Science</li>
              <li>Mathematics</li>
              <li>Arts</li>
              <li>Sanksrit</li>
              <li>Physical Education</li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-3"> New COURSES</h3>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>Science</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-3">HELP & SUPPORT</h3>
            <ul className="text-sm space-y-1 text-gray-300">
                <li>24/7 Live help</li>
                <li>Feedback</li>
                <li>Safety Tips</li>
                <li>C/ontact Us</li>
                <li>FAQs</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 grid md:grid-cols-3 gap-8 border-t border-gray-700 pt-6">

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-2">GET IN TOUCH</h3>
            <p className="text-sm text-gray-300">
              Address: Bodhan Revenue Division, C/O Basavalingappa Mutt,
              Bichikunda Village, Kamareddy-503306
              Nizamabad-Telangana State
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Phone: 9014339319, 9160685912
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Email: ssbscollege@gmail.com
            </p>
          </div>

          {/* Apps (Optional) */}
          <div>
            <h3 className="font-semibold mb-2">DOWNLOAD APP</h3>
            <p className="text-sm text-gray-300">
              Coming soon...
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2">SOCIAL MEDIA</h3>

            <div className="flex gap-3 mt-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Footer;