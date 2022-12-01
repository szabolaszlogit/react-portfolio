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
        "https://www.omdbapi.com/?apikey=1b8b0ce1&s=" + title
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
      <div className="df bg-light-red mw7 center pa4 br2-ns ba b--black-10 cf bn ma0 pa0">
        <input
          className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Search for movies"
        />
        <button
          tabIndex="1"
          className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
          onClick={() => searchMovies(title)}
        >
          Search
        </button>
      </div>

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
