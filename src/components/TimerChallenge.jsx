import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  //   const [timerExpired, setTimerExpired] = useState(false);
  //   const [timerStarted, setTimerStarted] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  const timer = useRef();

  const dialogRef = useRef();
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialogRef.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };
  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((time) => time - 10);
    }, 10);
  };
  const handleStop = () => {
    clearInterval(timer.current);
    dialogRef.current.open();
  };
  return (
    <>
      <ResultModal
        onReset={handleReset}
        timeRemaining={timeRemaining}
        ref={dialogRef}
        targetTime={targetTime}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Time is running!" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
