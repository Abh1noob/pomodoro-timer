import React, { useState, useEffect } from "react";

const Timer = () => {
  const [currentTimer, setCurrentTimer] = useState("pomodoro");
  const [timeRemaining, setTimeRemaining] = useState(timer.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalCount, setIntervalCount] = useState(timer.longBreakInterval);
  const [pomodoroDuration, setPomodoroDuration] = useState(timer.pomodoro);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    timer.shortBreak
  );
  const [longBreakDuration, setLongBreakDuration] = useState(timer.longBreak);

  const updateTimer = () => {
    setTimeRemaining((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      } else {
        
        if (currentTimer === "pomodoro") {
          if (intervalCount > 1) {
            setCurrentTimer("shortBreak");
            setTimeRemaining(shortBreakDuration * 60);
          } else {
            setCurrentTimer("longBreak");
            setTimeRemaining(longBreakDuration * 60);
          }
          setIntervalCount((prevCount) => prevCount - 1);
        } else if (currentTimer === "shortBreak") {
          setCurrentTimer("pomodoro");
          setTimeRemaining(pomodoroDuration * 60);
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
        setTimeRemaining(pomodoroDuration * 60);
        break;
      case "shortBreak":
        setTimeRemaining(shortBreakDuration * 60);
        break;
      case "longBreak":
        setTimeRemaining(longBreakDuration * 60);
        break;
      default:
        setTimeRemaining(pomodoroDuration * 60);
    }
  };

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };
  
  const handleReset = () => {
    setIsRunning(false);
    setIntervalCount(timer.longBreakInterval);
    setCurrentTimer("pomodoro");
    setTimeRemaining(pomodoroDuration * 60);
  };

  const handlePomodoroChange = (value) => {
    setPomodoroDuration(Math.max(1, pomodoroDuration + value));
    if (currentTimer === "pomodoro") {
      setTimeRemaining(Math.max(1, timeRemaining + value * 60));
    }
  };

  const handleShortBreakChange = (value) => {
    setShortBreakDuration(Math.max(1, shortBreakDuration + value));
    if (currentTimer === "shortBreak") {
      setTimeRemaining(Math.max(1, timeRemaining + value * 60));
    }
  };

  const handleLongBreakChange = (value) => {
    setLongBreakDuration(Math.max(1, longBreakDuration + value));
    if (currentTimer === "longBreak") {
      setTimeRemaining(Math.max(1, timeRemaining + value * 60));
    }
  };

  const handleLongBreakIntervalChange = (value) => {
    setIntervalCount(Math.max(1, intervalCount + value));
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
      <div>
        <p>Pomodoro Duration: {pomodoroDuration} minutes</p>
        <button onClick={() => handlePomodoroChange(1)}>+</button>
        <button onClick={() => handlePomodoroChange(-1)}>-</button>
      </div>
      <div>
        <p>Short Break Duration: {shortBreakDuration} minutes</p>
        <button onClick={() => handleShortBreakChange(1)}>+</button>
        <button onClick={() => handleShortBreakChange(-1)}>-</button>
      </div>
      <div>
        <p>Long Break Duration: {longBreakDuration} minutes</p>
        <button onClick={() => handleLongBreakChange(1)}>+</button>
        <button onClick={() => handleLongBreakChange(-1)}>-</button>
      </div>
      <div>
        <p>Long Break Interval: {intervalCount}</p>
        <button onClick={() => handleLongBreakIntervalChange(1)}>+</button>
        <button onClick={() => handleLongBreakIntervalChange(-1)}>-</button>
      </div>
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
