export default function WatchListItem({ movie, mode, onSelectMovie, onDeleteMovie }) {
  return (
    <li onClick={() => (mode === "details" ? null : onSelectMovie(movie.imdbID))}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        {mode === "details" ? (
          <>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </>
        ) : (
          <p>
            <span>📆</span>
            <span>{movie.Year}</span>
          </p>
        )}
        {mode === "details" ? (
          <button className="btn-delete" onClick={() => onDeleteMovie(movie.imdbID)}>
            X
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
}
