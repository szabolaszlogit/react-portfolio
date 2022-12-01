import React, { useState, useEffect } from "react";
import "./jump/jump.css";

function JumpGame() {
  const boardWidth = 600;
  const boardHeight = 600;

  const birdSize = 40;
  const fallSpeed = 10;
  let flySpeed = 60;
  const [birdTop, setBirdTop] = useState(0);
  const [birdBottom, setBirdBottom] = useState();

  const obstacleLeftStart = 570;
  //let obstacleHeight = 100;
  let obstacleSpeed = 10;
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [obstacleBottom, setObstacleBottom] = useState(100);
  const [obstacleLeft, setObstacleLeft] = useState(obstacleLeftStart);

  let timerBirdFalling;
  let timerObstacle;

  // bird falling
  useEffect(() => {
    if(obstacleSpeed == 0) {
      return
    }
    if (birdTop != boardHeight - birdSize) {
      timerBirdFalling = setInterval(() => {
        setBirdTop((birdTop) => birdTop + fallSpeed);
      }, 100);
      return () => clearInterval(timerBirdFalling);
    }
  });

  // obstacle running to left
  useEffect(() => {
    if (obstacleLeft < 10) {
      setObstacleLeft(600);
      let height = Math.random() * 500;
      setObstacleHeight(height);
      let bottom = Math.random() * (boardHeight - height);
      setObstacleBottom(bottom);
      return;
    }

    timerObstacle = setInterval(() => {
      setObstacleLeft(obstacleLeft - obstacleSpeed);
    }, 100);

    return () => clearInterval(timerObstacle);
  });
  // bird fly
  function flyBird() {
    if(obstacleSpeed == 0) {
      return
    }
    if (birdTop - flySpeed <= 0) {
      setBirdTop(0);
      return;
    }
    setBirdTop(birdTop - flySpeed);
  }

  // collision
  useEffect(() => {
    if (obstacleLeft < 100 && (birdTop < obstacleBottom )) {
      obstacleSpeed = 0;

      return()=> obstacleSpeed;
    }
  });

  return (
    <section onClick={flyBird}>
      <div>
        {obstacleLeft}
        <button>Start</button>
      </div>
      <div className="board">
        <Bird top={birdTop} />
        <Obstacles left={obstacleLeft} height={obstacleHeight} />
      </div>
    </section>
  );

  function Bird() {
    let top = birdTop + "px";
    return <div style={{ top: top }} className="bird"></div>;
  }

  function Obstacles() {
    let left = obstacleLeft + "px";
    let height = obstacleHeight + "px";
    let bottom = obstacleBottom + "px";
    return (
      <div
        style={{ left: left, height: height, bottom: bottom }}
        className="obstacles"
      ></div>
    );
  }
}
/*
  const boardSize = 600;

  const BirdSize = 40;
  const birdStartPos = 250;
  const fallSpeed = 10;
  const flySpeed = 60;
  const [birdTop, setBirdTop] = useState(birdStartPos);

  const obstacleLeftStart = 570;
  //let obstacleHeight = 100;
  let obstacleSpeed = 10;
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [obstacleLeft, setObstacleLeft] = useState(obstacleLeftStart);

  const [gameOver, setGameOver] = useState(false);

  // bird falling
  useEffect(() => {
    let timer;
    if (birdTop < boardSize - BirdSize) {
      timer = setInterval(() => {
        setBirdTop((birdTop) => birdTop + fallSpeed);
      }, 100);
      return () => clearInterval(timer);
    }
  });

  // bird fly
  function flyBird() {
    if (birdTop < 50  ) {
      return;
    }
    setBirdTop((birdTop) => birdTop - flySpeed);
  }
  // obstacle running to left
  useEffect(() => {
    let timer;

    if (obstacleLeft < 10) {
      setObstacleLeft(600);
      let height = Math.random() * 500;
      setObstacleHeight(height);
    }

    if (obstacleLeft > 0 ) {
      timer = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - obstacleSpeed);
      }, 100);

      return () => clearInterval(timer);
    }
  });

  // start
  function startGame() {}

  // collision
  useEffect(() => {
    if (obstacleLeft < 50 && birdTop < obstacleHeight) {
      return () => {
        obstacleSpeed = 0;
      };
    }
  });

  
  return (
    <section onClick={flyBird}>
      <div>
        <button onClick={startGame()}>Start</button>
      </div>
      // start butto // board // bird // obstacles // score
      <div className="board">
        <Bird top={birdTop} />
        <Obstacles left={obstacleLeft} height={obstacleHeight} />
        <States birdTop={birdTop} obstaclePos={obstacleLeft} />
      </div>
    </section>
  );
}

function Bird(props) {
  let top = props.top + "px";
  return <div style={{ top: top }} className="bird"></div>;
}

function Obstacles(props) {
  let left = props.left + "px";
  let height = props.height + "px";
  return (
    <div
      style={{ left: left, height: height, bottom: "0px" }}
      className="obstacles"
    ></div>
  );
}

function States(props) {
  return (
    <div>
      {props.birdTop} - {props.obstaclePos}
    </div>
  );

}*/
export default JumpGame;
