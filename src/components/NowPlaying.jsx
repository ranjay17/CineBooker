import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/movieSlice";

const NowPlaying = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);

  useEffect(() => {
    if (movies.length > 0) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://cinebooker-71e09-default-rtdb.firebaseio.com/movies.json"
        );

        if (res.data) {
          const loaded = Object.keys(res.data).map((key) => ({
            id: key,
            ...res.data[key],
          }));
          dispatch(setMovies(loaded));
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchMovies();
  }, []);

  const nowPlaying = movies.filter((m) => m.category === "Now Playing");

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Now Playing 🎬</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nowPlaying.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-xl overflow-hidden"
          >
            <img src={movie.poster} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-500 mt-2 text-sm">{movie.description}</p>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
