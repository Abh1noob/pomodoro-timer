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
  const [backgroundColor, setBackgroundColor] = useState("#59D5E0");
  const [durationBackgroundColor, setDurationBackgroundColor] =
    useState("#FAA300");

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
        setBackgroundColor("#59D5E0");
        setDurationBackgroundColor("#FAA300");
        break;
      case "shortBreak":
        setTimeRemaining(shortBreakDuration * 60);
        setBackgroundColor("#F6D365");
        setDurationBackgroundColor("#C08B5C");
        break;
      case "longBreak":
        setTimeRemaining(longBreakDuration * 60);
        setBackgroundColor("#F68E5F");
        setDurationBackgroundColor("#FAA300");
        break;
      default:
        setTimeRemaining(pomodoroDuration * 60);
        setBackgroundColor("#59D5E0");
        setDurationBackgroundColor("#FAA300");
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
    setBackgroundColor("#59D5E0");
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
    <div
      className="root"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <h1>
        {currentTimer === "pomodoro"
          ? "Pomodoro"
          : currentTimer === "shortBreak"
          ? "Short Break"
          : "Long Break"}{" "}
        Timer
      </h1>
      <p className="time-remaining">
        {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toString().padStart(2, "0")}
      </p>

      <div className="settings-container">
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => setTimer("pomodoro")}>Pomodoro</button>
        <button onClick={() => setTimer("shortBreak")}>Short Break</button>
        <button onClick={() => setTimer("longBreak")}>Long Break</button>
      </div>
      <div className="duration-settings-container">
        <div
          className="duration-settings"
          style={{ backgroundColor: durationBackgroundColor }}
        >
          <button
            className="arrow-button"
            onClick={() => handlePomodoroChange(1)}
          >
            ↑
          </button>
          <p>{pomodoroDuration} minutes</p>
          <button
            className="arrow-button"
            onClick={() => handlePomodoroChange(-1)}
          >
            ↓
          </button>
          <p className="duration-settings-text">Pomodoro Duration</p>
        </div>
        <div
          className="duration-settings"
          style={{ backgroundColor: durationBackgroundColor }}
        >
          <button
            className="arrow-button"
            onClick={() => handleShortBreakChange(1)}
          >
            ↑
          </button>
          <p>{shortBreakDuration} minutes</p>
          <button
            className="arrow-button"
            onClick={() => handleShortBreakChange(-1)}
          >
            ↓
          </button>
          <p className="duration-settings-text">Short Break Duration</p>
        </div>
        <div
          className="duration-settings"
          style={{ backgroundColor: durationBackgroundColor }}
        >
          <button
            className="arrow-button"
            onClick={() => handleLongBreakChange(1)}
          >
            ↑
          </button>
          <p>{longBreakDuration} minutes</p>
          <button
            className="arrow-button"
            onClick={() => handleLongBreakChange(-1)}
          >
            ↓
          </button>
          <p className="duration-settings-text">Long Break Duration</p>
        </div>
        <div
          className="duration-settings"
          style={{ backgroundColor: durationBackgroundColor }}
        >
          <button
            className="arrow-button"
            onClick={() => handleLongBreakIntervalChange(1)}
          >
            ↑
          </button>
          <p>{intervalCount} Intervals</p>
          <button
            className="arrow-button"
            onClick={() => handleLongBreakIntervalChange(-1)}
          >
            ↓
          </button>
          <p className="duration-settings-text">Long Break Interval</p>
        </div>
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
