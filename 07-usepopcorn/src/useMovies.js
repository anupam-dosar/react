import { useState, useEffect } from "react";

const OMDBKEY = "53f16206";
const OMDBBASE = "http://www.omdbapi.com/";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(`${OMDBBASE}?apikey=${OMDBKEY}&s=${query}&page=1`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Trouble loading movies!");

        const data = await res.json();
        // console.log(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            `${err.message}! ${
              err.message.includes("not found") ? "" : "Trouble loading movies, try again later"
            }`
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length >= 3) {
      setMovies([]);
      setError("");
      fetchMovies();
    }

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}
