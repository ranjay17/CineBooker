import React from "react";
import Sidebar from "../admin/Sidebar";
import HeroSection from "./HeroSection";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRated";
import Footer from "./Footer";

const Home = () => {
  const admin = localStorage.getItem("adminToken");

  return (
    <div className={`flex ${admin ? "" : "justify-center"}`}>
      {admin && <Sidebar />}

      <div className={`${admin ? "flex-1" : "w-full"}`}>
        <HeroSection />
        <NowPlaying />
        <TopRated />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
