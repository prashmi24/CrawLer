import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="homePage page">
      <Navbar />
      <HeroSection />
      <PopularCompanies />
      <HowItWorks />
      <PopularCategories />
      <Footer />
    </section>
  );
};

export default Home;
