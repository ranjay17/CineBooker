import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.items);

  if (movies.length === 0) return null; 

  const heroMovie = movies.find((m) => m.hero === true);

  if (!heroMovie) return null;

  return (
    <div
      className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] mb-10 cursor-pointer"
      onClick={() => navigate(`/movie/${heroMovie.id}`)}
    >
      <img
        src={heroMovie.poster}
        alt={heroMovie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default HeroSection;
