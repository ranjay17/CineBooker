import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMovies } from "../redux/movieSlice";

const useFetchMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movies.length > 0) return; 

    const fetchMovies = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_FIREBASE_DB_URL}/movies.json`
      );

      const loaded = Object.keys(res.data).map((key) => ({
        id: key,
        ...res.data[key],
      }));

      dispatch(setMovies(loaded));
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return { loading, movies };
};

export default useFetchMovies;
