import React, { useState, useEffect } from "react";
import "./flappy/flappy.css";

function FlappyBird() {
  const birdStartPos = 250;
  const fallSpeed = 10;
  const flySpeed = 60;
  const [birdTop, setBirdTop] = useState(birdStartPos);
  const boardSize = 600;
  const BirdSize = 40;

  useEffect(() => {
    let timer;

    if (birdTop <= boardSize - BirdSize) {
      timer = setInterval(() => {
        setBirdTop((birdTop) => birdTop + fallSpeed);
      }, 100);
      console.log(birdTop);
      return () => clearInterval(timer);
    }
  });

  function flyBird() {
    if (birdTop <= BirdSize) {
      return;
    }
    if (birdTop >= boardSize - BirdSize) {
      return;
    }
    setBirdTop((birdTop) => birdTop - flySpeed);
  }

  return (
    <section onClick={flyBird}>
      <div>
        <button onClick={() => setBirdTop(birdStartPos)}>Start</button>
      </div>
      // start butto // board // bird // obstacles // score
      <div className="board">
        <Bird top={birdTop} />
        <Obstacles left="20" />
      </div>
    </section>
  );
}

function Bird(props) {
  let top = props.top + "px";
  return <div style={{ top: top }} className="bird"></div>;
}

function Obstacles(props) {
  return <div className="obstacles"></div>;
}
export default FlappyBird;
