import React, { useState, useEffect } from "react";

import MovieCard from "./movie/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    searchMovies("Star Wars");
  }, []);

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      searchMovies(title);
    }
  }

  const searchMovies = async (title) => {
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=1b8b0ce1&s=" + title
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.Search);
      }
      if (!response.ok) {
        throw Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div onKeyDown={handleKeyDown}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Search for movies"
      />
      <button tabIndex="1" onClick={() => searchMovies(title)}>
        Serch
      </button>

      {movies?.length > 0 ? (
        <div>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div>No result</div>
      )}
    </div>
  );
}

export default Movies;
