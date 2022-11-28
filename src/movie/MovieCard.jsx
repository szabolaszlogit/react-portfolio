import React from "react";

function MovieCard(props) {
  return (
    <div>
      <div className=" bg-green mw6 pt2 pb4 ba center  ma5 tc black link dim lh-copy">
        <h1 className="f2 ma0">{props.movie.Title}</h1>

        <div>{props.movie.Year}</div>
        <div>{props.movie.imdbID}</div>
        <div><img src={props.movie.Poster} alt={props.movie.Title} /></div>
       

      </div>
    </div>
  );
}

export default MovieCard;
