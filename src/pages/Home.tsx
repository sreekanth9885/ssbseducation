// src/pages/Home.tsx
import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import { getHomeContent } from "../services/api";

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getHomeContent()
      .then((res) => setData(res.data))
      .catch(() => console.log("API not connected yet"));
  }, []);

  return (
    <div>
      <Hero />
      <Stats />
    </div>
  );
};

export default Home;