import { useState } from "react";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import SearchStats from "./components/SearchStats";
import Main from "./components/Main";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
import WatchSummery from "./components/WatchSummery";
import Loading from "./components/Loading";
import ErrorMsg from "./components/ErrorMsg";
import SelectedMovie from "./components/SelectedMovie";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => setSelectedId(null);

  const handleWatchedList = (movie) => {
    const isWatched = watched.findIndex((m) => m.imdbID === movie.imdbID);

    if (isWatched < 0) {
      setWatched((watched) => [...watched, movie]);
    } else {
      setWatched(watched.map((m) => (m.imdbID === movie.imdbID ? { ...m, ...movie } : m)));
    }
  };

  const deleteWatchedMovie = (id) =>
    setWatched((watched) => watched.filter((m) => m.imdbID !== id));

  const { movies, isLoading, error } = useMovies(query);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <SearchStats movies={movies} />
      </NavBar>

      <Main>
        <SearchResults>
          {isLoading && error === "" ? (
            <Loading />
          ) : error === "" ? (
            query ? (
              <MovieList movies={movies} mode="" onSelectMovie={handleSelectMovie} />
            ) : (
              <Loading>Type movie name above to search.</Loading>
            )
          ) : (
            <ErrorMsg>{error}</ErrorMsg>
          )}
        </SearchResults>

        <SearchResults>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              prevUserRating={watched.find((w) => w.imdbID === selectedId)?.userRating}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleWatchedList}
            />
          ) : (
            <>
              <WatchSummery watched={watched} />
              <MovieList
                movies={watched}
                mode="details"
                onSelectMovie={handleSelectMovie}
                onDeleteMovie={deleteWatchedMovie}
              />
            </>
          )}
        </SearchResults>
      </Main>
    </>
  );
}
