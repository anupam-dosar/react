import { useEffect, useState } from "react";
import Rating from "../components/StarRating/Rating";
import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";
import { useKey } from "../useKey";

const OMDBKEY = "53f16206";
const OMDBBASE = "http://www.omdbapi.com/";

export default function SelectedMovie({
  selectedId,
  prevUserRating = 0,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(prevUserRating);

  useKey(27, onCloseMovie);

  const {
    Actors: actors,
    BoxOffice: boxOffice,
    Country: country,
    Director: director,
    Genre: genre,
    Language: language,
    Plot: plot,
    Poster: poster,
    Ratings: ratings,
    Released: released,
    Runtime: runtime,
    Title: title,
    Writer: writer,
    Year: year,
    imdbID,
    imdbRating,
  } = movie;

  const handleAdd = () => {
    const movieToAdd = {
      imdbID: imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: userRating,
    };
    onAddWatched(movieToAdd);
    onCloseMovie();
  };

  useEffect(() => {
    setIsLoading(true);
    document.title = `... | usePopcorn`;
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${OMDBBASE}?apikey=${OMDBKEY}&i=${selectedId}`);

        if (!res.ok) throw new Error("Trouble loading movie details!");

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        } else {
          setMovie(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `${title} | usePopcorn`;

    // clean up
    return () => (document.title = "usePopcorn");
  }, [title]);

  const defaultRating = Math.round(parseFloat(imdbRating));

  return (
    <div className="details">
      {isLoading && <Loading />}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {prevUserRating !== 0 && (
                <div style={{ textAlign: "center", fontWeight: "normal" }}>You have rated</div>
              )}
              <Rating
                max={10}
                size={26}
                defaultRating={prevUserRating || defaultRating}
                onSetRating={setUserRating}
              />

              {prevUserRating === 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to watchlist
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
