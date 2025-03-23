import React, { useEffect } from "react";
import "../../App.css";
import Cards from "../Cards/Cards";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";
import { ref, get } from "firebase/database";
import { db } from "../../services/firebase";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adventuresRef = ref(db, "adventures");
        const snapshot = await get(adventuresRef);

        if (snapshot.exists()) {
          const adventuresData = snapshot.val();
          console.log("Data fetched successfully:", adventuresData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
