import React, { useState, useEffect } from "react";
import "./jump/jump.css";

function JumpGame() {
  const boardWidth = 600;
  const boardHeight = 600;

  const birdSize = 80;
  const fallSpeed = 10;
  const [birdTop, setBirdTop] = useState(0);
  const [flySpeed, setFlySpeed] = useState(60);

  const obstacleLeftStart = 570;
  const [obstacleSpeed, setObstacleSpeed] = useState(10);
  const [obstacleHeight, setObstacleHeight] = useState(100);
  const [obstacleBottom, setObstacleBottom] = useState(100);
  const [obstacleLeft, setObstacleLeft] = useState(obstacleLeftStart);

  const [gameRunning, setGameRunning] = useState(true);
  const [score, setScore] = useState(0);

  let timerBirdFalling;
  let timerObstacle;

  // bird falling
  useEffect(() => {
    if (gameRunning == false) {
      return;
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
      setScore(score + 1);
      setFlySpeed(flySpeed + 10);
      setObstacleSpeed(obstacleSpeed + 10);

      return;
    }

    timerObstacle = setInterval(() => {
      setObstacleLeft(obstacleLeft - obstacleSpeed);
    }, 100);

    return () => clearInterval(timerObstacle);
  });
  // bird fly
  function flyBird() {
    if (gameRunning == false) {
      return;
    }
    if (birdTop - flySpeed <= 0) {
      setBirdTop(0);
      return;
    }
    setBirdTop(birdTop - flySpeed);
  }

  // collision
  useEffect(() => {
    let birdPos = boardWidth - birdTop;
    let obsTop = obstacleBottom + obstacleHeight;

    if (
      obstacleLeft < birdSize &&
      birdPos > obstacleBottom &&
      birdPos < obsTop
    ) {
      endGame();
    }
  });

  function endGame() {
    setObstacleSpeed(0);
    setGameRunning(false);
  }
  function startGame() {
    setObstacleSpeed(10);
    setFlySpeed(60)
    setObstacleLeft(600);
    setScore(0)
    setGameRunning(true);
  }

  return (
    <section onClick={flyBird}>
      <div>
        <div className="ma1">Score: {score}</div>
        <div className="ma1">Speed: {flySpeed}</div>
        <button className="f6 grow no-underline br-pill ph3 pv2 ma3 dib white bg-dark-green" onClick={startGame}>Start</button>
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

export default JumpGame;
