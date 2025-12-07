import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, removeMovie } from "../redux/movieSlice";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_FIREBASE_DB_URL;

const ManageMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies.items);

  const fetchMovies = async () => {
    const res = await fetch(`${API}/movies.json`);
    const data = await res.json();

    const loaded = [];

    for (let id in data) {
      loaded.push({
        id,
        ...data[id],
      });
    }

    dispatch(setMovies(loaded));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${API}/movies/${id}.json`, { method: "DELETE" });

    dispatch(removeMovie(id));
    alert("Movie Deleted!");
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Manage Movies</h2>

      {movies?.length === 0 ? (
        <p className="text-gray-500">No movies found...</p>
      ) : (
        <div className="space-y-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border rounded p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">{movie.title}</h3>
                  <p className="text-gray-600">{movie.category}</p>
                </div>

                <img
                  src={movie.poster}
                  className="w-28 h-36 rounded object-cover"
                />
              </div>

              <button
                onClick={() => navigate(`/edit/${movie.id}`)}
                className="mt-4 bg-yellow-500 text-white px-4 py-1 rounded mr-3"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(movie.id)}
                className="mt-4 bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMovie;
