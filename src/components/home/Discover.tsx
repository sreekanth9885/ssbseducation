import { useNavigate } from "react-router-dom";
const Discover = () => {
    const navigate = useNavigate();
  const items = [
  { title: "Courses", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", link: "/courses" },
  { title: "Academics", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b", link: "/courses" },
  { title: "Admission", img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b", link: "/contact" },
  { title: "Students Profile", img: "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66", link: "/about" },
  { title: "Research & Education", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d", link: "/about" },
  { title: "Course", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7", link: "/courses" },
  { title: "Exam Time Tables", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40", link: "/contact" },
  { title: "Seminar 2025", img: "https://images.unsplash.com/photo-1515169067868-5387ec356754", link: "/contact" },
];

  return (
    <div className="py-12 bg-white">

      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">
          Discover <span className="text-orange-500">More</span>
        </h2>

        <p className="text-gray-600 max-w-4xl mx-auto mt-4">
          All over the SRI SADGURU BANDAYAPPA SWAMY B.ED COLLEGE-SSBSC is pretty awesome.
          Best faculty, best friends, best infrastructure, management etc everything is cool.
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-4 gap-6 px-6 max-w-7xl mx-auto">

        {items.map((item, index) => (
          <div key={index} onClick={() => navigate(item.link)} className="relative group cursor-pointer hover:scale-105 transition"
>

            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center group-hover:bg-black/60 transition">
              <h3 className="text-white font-semibold text-lg">
                {item.title}
              </h3>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Discover;