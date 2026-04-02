// src/components/home/Hero.tsx
import banner from "../../assets/banner.webp";

const Hero = () => {
  return (
    <div
      className="relative h-100 md:h-125 flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 max-w-3xl">
        <p className="mb-3 text-sm tracking-wide">
          DISCOVER QUALITY EDUCATION ANYTIME, ANYWHERE
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Empower Your Future with <br />
          <span className="text-orange-400">
            Education Courses
          </span>
        </h1>

        {/* Optional Button */}
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded text-white font-medium">
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default Hero;