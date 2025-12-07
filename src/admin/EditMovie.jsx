import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMovie } from "../redux/movieSlice";

const API = import.meta.env.VITE_FIREBASE_DB_URL;

const EditMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [category, setCategory] = useState("");
  const [hero, setHero] = useState(false);
  const [shows, setShows] = useState([{ time: "" }]);

  useEffect(() => {
    let isMounted = true;

    const loadMovie = async () => {
      const res = await fetch(`${API}/movies/${id}.json`);
      const data = await res.json();

      if (isMounted && data) {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPoster(data.poster || "");
        setCategory(data.category || "");
        setHero(data.hero || false);
        setShows(data.shows || [{ time: "" }]);
      }

      setLoading(false); 
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShowChange = (index, e) => {
    const updated = [...shows];
    updated[index].time = e.target.value;
    setShows(updated);
  };

  const addShowField = () => {
    setShows([...shows, { time: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      poster,
      category,
      hero,
      shows,
      updatedAt: new Date().toISOString(),
    };

    await fetch(`${API}/movies/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });

    dispatch(updateMovie({ id, ...updatedData }));

    alert("Movie Updated Successfully!");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-xl font-semibold">
        Loading movie details...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <textarea
          placeholder="Movie Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Category</option>
          <option value="Now Playing">Now Playing</option>
          <option value="Top Movies in Theaters">Top Movies in Theaters</option>
          <option value="Top Rated">Top Rated</option>
        </select>

        <label className="flex gap-2 text-sm items-center">
          <input
            type="checkbox"
            checked={hero}
            onChange={(e) => setHero(e.target.checked)}
          />
          Add to Hero Section
        </label>

        <h3 className="text-lg font-semibold">Show Timings</h3>

        {shows.map((show, i) => (
          <div key={i} className="border p-3 rounded">
            <input
              type="time"
              value={show.time}
              onChange={(e) => handleShowChange(i, e)}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addShowField}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          + Add Show Time
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
