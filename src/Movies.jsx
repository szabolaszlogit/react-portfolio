import React, { useState, useEffect } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies();
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?s=Batttman&apikey=1b8b0ce1"
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

  if (movies?.length > 0) {
    return <div>{movies.map((movie) => movie.Title)}</div>;
  } else {
    return <div>No result</div>;
  }
}
export default Movies;
