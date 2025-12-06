import React from "react";
import { useSelector } from "react-redux";

const TopRated = () => {
  const movies = useSelector((state) => state.movies.items);

  const topRated = movies.filter((m) => m.category === "Top Rated");

  return (
    <div className="p-6 w-full mt-10">
      <h1 className="text-3xl font-bold mb-6">Top Rated ⭐</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topRated.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-xl">
            <img src={movie.poster} className="w-full h-60 object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>

              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
