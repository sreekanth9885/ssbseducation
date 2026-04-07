import { useState } from "react";
// 👉 add your image in assets
import bedImage from "../assets/bed.jpg";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div>

      {/* 🔷 SEARCH BAR */}
      <div className="bg-blue-900 py-6 flex justify-center">
        <div className="flex w-[90%] md:w-[600px]">

          <input
            type="text"
            placeholder="Search Course"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           className="flex-1 p-3 rounded-l outline-none text-black bg-white placeholder-gray-500"
          />

          <button className="bg-orange-500 text-white px-6 rounded-r">
            SEARCH COURSE
          </button>

        </div>
      </div>

      {/* 🔶 HEADING */}
      <div className="text-center py-10 bg-gradient-to-r from-gray-100 to-orange-100">
        <h2 className="text-3xl font-bold">
          All <span className="text-orange-500">Off-line</span> Courses
        </h2>

        <p className="text-gray-600 mt-2">
          Faculty of Education
        </p>
      </div>

      {/* 🔥 COURSE CARD */}
      <div className="flex justify-center py-10">

        <div 
  onClick={() => navigate("/courses/bed")}
  className="bg-white rounded-lg shadow-md w-[350px] overflow-hidden hover:shadow-xl transition cursor-pointer"
>

          {/* IMAGE */}
          <img
            src={bedImage}
            alt="B.Ed"
            className="w-full h-40 object-cover"
          />

          {/* CONTENT */}
          <div className="p-4">

            <h3 className="font-semibold text-lg mb-2">
              The Complete B.Ed Program
            </h3>

            {/* TAGS */}
            <div className="flex gap-2 mb-2">
              <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                2 Yrs Course
              </span>

              <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                04 Semesters
              </span>
            </div>

            {/* RATING */}
            <div className="text-orange-500">
              ⭐⭐⭐⭐⭐ <span className="text-black text-sm ml-2">4.0</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Courses;