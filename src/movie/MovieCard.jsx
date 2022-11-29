import React from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  return (
    <div>
      <Link to={`/movie/ ${props.movie.imdbID}`}>
        <div className=" bg-green mw6 pt2 pb4 ba center  ma5 tc black link dim lh-copy">
          <h1 className="f2 ma0">{props.movie.Title}</h1>
          <div>{props.movie.Year}</div>
          <div>
            <img src={props.movie.Poster} alt={props.movie.Title} />
          </div>
        </div>{" "}
      </Link>
    </div>
  );
}

export default MovieCard;
