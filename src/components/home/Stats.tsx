// src/components/home/Stats.tsx
const Stats = () => {
  const data = [
    { label: "Courses", value: "01" },
    { label: "Students Placed", value: "100+" },
    { label: "Students", value: "200+" },
  ];

  return (
    <div className="flex justify-center gap-10 bg-white shadow p-6 -mt-10 max-w-xl mx-auto rounded-lg">
      {data.map((item, i) => (
        <div key={i} className="text-center">
          <h3 className="text-2xl font-bold">{item.value}</h3>
          <p className="text-gray-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;