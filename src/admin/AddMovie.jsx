import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/movieSlice";
import {useNavigate} from "react-router-dom";

const AddMovie = () => {
  const API = import.meta.env.VITE_FIREBASE_DB_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [category, setCategory] = useState("");
  const [hero, setHero] = useState(false);
  const [shows, setShows] = useState([{ time: "" }]);

  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [trailer, setTrailer] = useState("");

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

    const movieData = {
      title,
      description,
      poster,
      category,
      hero,
      director,
      releaseYear,
      trailer,
      shows,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`${API}/movies.json`, {
      method: "POST",
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    const firebaseID = data.name;
    dispatch(addMovie({ id: firebaseID, ...movieData }));
    alert("Movie Added Successfully!");
    navigate('/')

    setTitle("");
    setDescription("");
    setPoster("");
    setCategory("");
    setHero(false);
    setShows([{ time: "" }]);
    setDirector("");
    setReleaseYear("");
    setTrailer("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Movie & Shows</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Director Name"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="number"
          placeholder="Release Year (e.g., 2024)"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Trailer Video Link"
          value={trailer}
          onChange={(e) => setTrailer(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Movie Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Now Playing">Now Playing</option>
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
              required
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
          Save Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
