import { useState, useEffect } from "react";

function Timer({ name }) {
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const toTimeString = (sec) => {
    const MINUTE_SECONDS = 60;
    const HOUR_MINUTES = 60;
    const DAY_HOURS = 24;

    const days = Math.floor(sec / (DAY_HOURS * HOUR_MINUTES * MINUTE_SECONDS));
    const hours = Math.floor((sec % (DAY_HOURS * HOUR_MINUTES * MINUTE_SECONDS)) / (HOUR_MINUTES * MINUTE_SECONDS));
    const minutes = Math.floor((sec % (HOUR_MINUTES * MINUTE_SECONDS)) / MINUTE_SECONDS);
    const seconds = sec % MINUTE_SECONDS;

    const timeParts = [];
    if (days > 0) timeParts.push(`${days}d`);
    if (hours > 0 || days > 0) timeParts.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) timeParts.push(`${minutes}m`);
    timeParts.push(`${seconds}s`);

    return timeParts.join(" ");
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setSecond(0);
    setIsRunning(false);
  };

  return (
    <div
      className="border border-black border-2 rounded-4 mx-auto p-3 mt-3 px-3"
      style={{ width: "fit-content" }}
    >
      <h2 className="text-primary text-center pb-3">{name || "TIMER"}</h2>
      <div className="border border-black border-2 rounded-3 text-end px-5 py-2 fs-4 bg-white">
        {toTimeString(second)}
      </div>
      <div className="d-flex justify-content-between gap-5 mt-3">
        <button className="btn btn-danger py-2 px-3" onClick={resetTimer}>
          <i className="bi bi-arrow-counterclockwise"></i> Reset
        </button>
        <button
          className={`btn ${isRunning ? "btn-warning py-2 px-3" : "btn-success py-2 px-3"}`}
          onClick={() => setIsRunning((prev) => !prev)}
        >
          <i className={`bi ${isRunning ? "bi-pause" : "bi-play"}`}></i>{" "}
          {isRunning ? "Pause" : "Run"}
        </button>
      </div>
    </div>
  );
}

export default Timer;