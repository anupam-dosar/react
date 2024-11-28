import WatchListItem from "./WatchListItem";

export default function MovieList({ movies, mode, selectedId, onSelectMovie, onDeleteMovie }) {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <WatchListItem
          movie={movie}
          key={movie.imdbID}
          mode={mode}
          selectedId={selectedId}
          onSelectMovie={onSelectMovie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
