import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [currentTimer, setCurrentTimer] = useState('pomodoro'); 
    const [timeRemaining, setTimeRemaining] = useState(timer.pomodoro * 60); 

    const updateTimer = () => {
        setTimeRemaining(prevTime => prevTime - 1); 
    };

    useEffect(() => {
        const timerInterval = setInterval(() => {
            updateTimer();
        }, 1000); 

        return () => clearInterval(timerInterval); 
    }, []);

    const setTimer = (mode) => {
        setCurrentTimer(mode);
        switch (mode) {
            case 'pomodoro':
                setTimeRemaining(timer.pomodoro * 60);
                break;
            case 'shortBreak':
                setTimeRemaining(timer.shortBreak * 60);
                break;
            case 'longBreak':
                setTimeRemaining(timer.longBreak * 60);
                break;
            default:
                setTimeRemaining(timer.pomodoro * 60);
        }
    };

    return (
        <div>
            <h1>{currentTimer} Timer</h1>
            <p>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
            <button onClick={() => setTimer('pomodoro')}>Pomodoro</button>
            <button onClick={() => setTimer('shortBreak')}>Short Break</button>
            <button onClick={() => setTimer('longBreak')}>Long Break</button>
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
