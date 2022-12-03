import React, { useState, useEffect } from "react";

import "./snake/snake.css";

export default function Snake() {
  const [dots, setDots] = useState([
    { top: 0, left: 0 },
    { top: 2, left: 0 },
  ]);
  const [direction, setDirection] = useState("Down");
  const [food, setFood] = useState({ top: 40, left: 40 });
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);

  function moveSnake() {
    let newdots = [...dots];
    let head = newdots[newdots.length - 1];
    detectCollision(head);

    let newhead;

    if (direction == "Down") {
      newhead = { top: head.top + 2, left: head.left };
    }

    if (direction == "Up") {
      newhead = { top: head.top - 2, left: head.left };
    }

    if (direction == "Left") {
      newhead = { top: head.top, left: head.left - 2 };
    }

    if (direction == "Right") {
      newhead = { top: head.top, left: head.left + 2 };
    }
    newdots.push(newhead);
    newdots.shift();
    setDots(() => [...newdots]);
  }

  let changeDirection = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection("Up");
        break;
      case 40:
        setDirection("Down");
        break;
      case 37:
        setDirection("Left");
        break;
      case 39:
        setDirection("Right");
        break;
    }
  };

  function detectCollision(head) {
    if (
      head.top <= 0 ||
      head.top >= 100 ||
      head.left <= -1 ||
      head.left > 100
    ) {
      setIsRunning(false);
    }
  }

  function enlargeSnake() {
    let newdots = [...dots];
    newdots.unshift({ top: newdots[0].top, left: newdots[0].left });
    setDots(() => [...newdots]);
  }

  function generateFood() {
    let min = 1;
    let max = 98;
    let top = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let left = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    setFood({ top: top, left: left });
  }

  // collision: food
  useEffect(() => {
    let head = dots[dots.length - 1];
    if (head.left == food.left && head.top == food.top) {
      setScore(() => score + 1);
      enlargeSnake();
      generateFood();
    }
  });

  // move snake
  useEffect(() => {
    if (isRunning) {
      let timerSnake = setInterval(() => {
        moveSnake();
      }, 100);
      return () => clearInterval(timerSnake);
    }
  }, [dots]);

  function endGame(params) {
    setIsRunning(false);
    setScore(0);
  }
  function startGame(params) {
    setScore(0);
    setIsRunning(true);
    setDots([
      { top: 0, left: 0 },
      { top: 2, left: 0 },
    ]);
    setDirection("Down");
  }
  return (
    <section>
      <div>{score}</div>
      <Start />
      <div className="snakeboard" tabIndex="1" onKeyDown={changeDirection}>
        <Snake />
        <Food />
      </div>
    </section>
  );

  function Start() {
    if (isRunning) {
      return (
        <div>
          <button className="f6 grow no-underline br-pill ph3 pv2 ma3 dib white bg-dark-green"  onClick={endGame}>Reset</button>
        </div>
      );
    }
    return (
      <div>
        <button className="f6 grow no-underline br-pill ph3 pv2 ma3 dib white bg-dark-green"  onClick={startGame}>Start</button>
      </div>
    );
  }
  function Snake() {
    return (
      <div>
        {dots.map((dot, i) => {
          let top = dot.top + "%";
          let left = dot.left + "%";
          return (
            <div
              className="snakedot"
              key={i}
              style={{ top: top, left: left }}
            ></div>
          );
        })}
      </div>
    );
  }

  function Food() {
    let top = food.top + "%";
    let left = food.left + "%";
    return <div className="food" style={{ top: top, left: left }}></div>;
  }
}
