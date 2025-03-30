import React, { useEffect, useState } from "react";
import "../../App.css";
import Cards from "../Cards/Cards";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";

function Home() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setTrails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading trails...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <HeroSection />
      <Cards trails={trails} />
      <Footer />
    </>
  );
}

export default Home;
