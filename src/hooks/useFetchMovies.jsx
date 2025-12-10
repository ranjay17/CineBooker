import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMovies } from "../redux/movieSlice";

const useFetchMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_FIREBASE_DB_URL}/movies.json`
      );

      const movieArr = Object.keys(res.data).map((key) => ({
        id: key,
        ...res.data[key],
      }));
      dispatch(setMovies(movieArr));
    };
    fetchMovies();
  }, []);

};

export default useFetchMovies;
