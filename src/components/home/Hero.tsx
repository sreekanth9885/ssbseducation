import banner from "../../assets/banner.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 Content */}
      <div className="relative z-10 text-white px-4 max-w-3xl">

        <p className="mb-3 text-sm tracking-wide uppercase text-gray-200">
          Discover Quality Education Anytime, Anywhere
        </p>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Empower Your Future with <br />
          <span className="text-orange-400">
            Education Courses
          </span>
        </h1>

        <p className="mt-4 text-gray-300">
          Join our institution and build a strong academic foundation
          for a successful career.
        </p>

        {/* 🔥 Buttons */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">

  <button 
    onClick={() => navigate("/courses")}
    className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded font-medium cursor-pointer"
  >
    Explore Courses
  </button>

  <button 
    onClick={() => navigate("/contact")}
    className="border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition cursor-pointer"
  >
    Contact Us
  </button>

</div>
      </div>
    </div>
  );
};

export default Hero;