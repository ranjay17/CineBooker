import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchMovies from "../hooks/useFetchMovies";
import BookingModal from "../components/BookingModal";

const MovieDetail = () => {
  const { id } = useParams();
  useFetchMovies();

  const movies = useSelector((state) => state.movies.items);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  const movie = movies.find((m) => m.id === id);

  if (!movie) return null;

  const openModal = (show) => {
    setSelectedShow(show);
    setIsOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[400px] object-cover rounded-xl shadow-md"
      />

      <h1 className="text-4xl font-bold mt-6">{movie.title}</h1>

      <h3 className="text-xl font-semibold mt-3">Director: {movie.director}</h3>

      <p className="text-gray-600 mt-1">Release Year: {movie.releaseYear}</p>

      <button
        onClick={() => window.open(movie.trailer, "_blank")}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        ▶ Watch Trailer
      </button>

      <p className="text-gray-600 text-lg mt-4">{movie.description}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Available Shows</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {movie.shows.map((show, i) => (
          <button
            key={i}
            onClick={() => openModal(show)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            {show.time}
          </button>
        ))}
      </div>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        show={selectedShow}
        movie={movie}
      />
    </div>
  );
};

export default MovieDetail;
