import React, { useState, useEffect } from "react";

const Timer = () => {
  const [currentTimer, setCurrentTimer] = useState("pomodoro");
  const [timeRemaining, setTimeRemaining] = useState(timer.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);

  const updateTimer = () => {
    setTimeRemaining((prevTime) => prevTime - 1);
  };

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const setTimer = (mode) => {
    setCurrentTimer(mode);
    switch (mode) {
      case "pomodoro":
        setTimeRemaining(timer.pomodoro * 60);
        break;
      case "shortBreak":
        setTimeRemaining(timer.shortBreak * 60);
        break;
      case "longBreak":
        setTimeRemaining(timer.longBreak * 60);
        break;
      default:
        setTimeRemaining(timer.pomodoro * 60);
    }
  };

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(timer.pomodoro * 60);
  };

  return (
    <div>
      <h1>{currentTimer} Timer</h1>
      <p>
        Time Remaining: {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toString().padStart(2, "0")}
      </p>
      <button onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => setTimer("pomodoro")}>Pomodoro</button>
      <button onClick={() => setTimer("shortBreak")}>Short Break</button>
      <button onClick={() => setTimer("longBreak")}>Long Break</button>
    </div>
  );
};

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

export default Timer;
