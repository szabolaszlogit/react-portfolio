import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Movie() {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function getMovie() {
      const response = await fetch(
        "https://www.omdbapi.com/?apikey=1b8b0ce1&i=" + params.id
      );
      setMovie(await response.json());
      console.log(movie);
    }
    getMovie();
  }, []);

  return (
    <div>
      <div className="bg-green mw6 pa3 ba center  ma5 tc black lh-copy">
        <h1 className="f3 ma0">{movie.Title}</h1>
        <p className=" ma1">{movie.Year}</p>
        <p className=" ma1">Director: {movie.Director}</p>
        <p className=" ma1">Actors: {movie.Actors}</p>
        <p className=" ma1">Box Office: {movie.BoxOffice}</p>
        <p className=" ma1">{movie.Awards}</p>
        <p className=" ma1">{movie.Genre}</p>
        <p className=" ma1">IMDB: {movie.imdbRating}</p>
        <p className=" ma1">{movie.Plot}</p>
        <div>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      </div>
    </div>
  );
}

export default Movie;
