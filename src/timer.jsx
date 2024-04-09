import React, { useState, useEffect } from "react";

const Timer = () => {
  const [currentTimer, setCurrentTimer] = useState("pomodoro");
  const [timeRemaining, setTimeRemaining] = useState(timer.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalCount, setIntervalCount] = useState(timer.longBreakInterval);

  const updateTimer = () => {
    setTimeRemaining((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      } else {
        
        if (currentTimer === "pomodoro") {
          if (intervalCount > 1) {
            setCurrentTimer("shortBreak");
            setTimeRemaining(timer.shortBreak * 60);
          } else {
            setCurrentTimer("longBreak");
            setTimeRemaining(timer.longBreak * 60);
          }
          setIntervalCount((prevCount) => prevCount - 1);
        } else if (currentTimer === "shortBreak") {
          setCurrentTimer("pomodoro");
          setTimeRemaining(timer.pomodoro * 60);
        } else if (currentTimer === "longBreak") {
          setIsRunning(false); 
          setCurrentTimer("longBreak");
          setTimeRemaining(0);
        }
      }
    });
  };

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        updateTimer();
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, intervalCount, currentTimer]);

  const setTimer = (mode) => {
    setIsRunning(false);
    setIntervalCount(timer.longBreakInterval);
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
    setIntervalCount(timer.longBreakInterval);
    setCurrentTimer("pomodoro");
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
  pomodoro: 5, 
  shortBreak: 2, 
  longBreak: 3, 
  longBreakInterval: 3,
};

export default Timer;
