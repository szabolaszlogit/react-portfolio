import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function getMovie() {
      const response = await fetch(
        "http://www.omdbapi.com/?apikey=1b8b0ce1&i=" + params.id
      );
      setMovie(await response.json());
      console.log(movie);
    }
    getMovie();
  }, []);

  return (
    <div>
      {movie.Title} {movie.Year}
      {movie.Actors}
    </div>
  );
}

export default Movie;
