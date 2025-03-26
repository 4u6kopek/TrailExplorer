import React, { useEffect, useState } from "react";
import "../../App.css";
import Cards from "../Cards/Cards";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";

function Home() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    fetch("https://trailexplorerbackend.vercel.app/api/trails")
      .then((res) => res.json())
      .then((data) => setTrails(data))
      .catch((err) => console.error("Error fetching trails:", err));
  }, []);

  return (
    <>
      <HeroSection />
      <Cards trails={trails} />
      <Footer />
    </>
  );
}

export default Home;
