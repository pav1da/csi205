import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import defaultImg from "../assets/images/default.jpg";
import basketballImg from "../assets/images/basketball.jpg";
import footballImg from "../assets/images/football.jpg";
import voleyballImg from "../assets/images/Voleyball.jpg";
import humanImg from "../assets/images/human.jpg";
import cartoonImg from "../assets/images/cartoon.jpg";
import logoImg from "../assets/images/logo.png";
import fieldImg from "../assets/images/field.jpg";

const Animation = () => {
  const fieldWidth = 850;
  const fieldHeight = 550;
  const diameter = 120;
  const maxHori = fieldWidth - diameter - 2;
  const maxVerti = fieldHeight - diameter - 2;
  const vx = 5;
  const vy = 5;

  const [rotation, setRotation] = useState(0);
  const [running, setRunning] = useState(false);
  const [hori, setHori] = useState(true);
  const [verti, setVerti] = useState(true);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ballSrc, setBallSrc] = useState(defaultImg);

  const runClick = () => setRunning((prev) => !prev);

  const btnBasketball = () => setBallSrc(basketballImg);
  const btnFootball = () => setBallSrc(footballImg);
  const btnVoleyball = () => setBallSrc(voleyballImg);
  const btnHuman = () => setBallSrc(humanImg);
  const btnCartoon = () => setBallSrc(cartoonImg);
  const btnLogo = () => setBallSrc(logoImg);

  const calculate = () => {
    let newX = x;
    let newY = y;
    let newHori = hori;
    let newVerti = verti;

    if (newHori) {
      newX += vx;
      if (newX > maxHori) newHori = false;
    } else {
      newX -= vx;
      if (newX < 0) newHori = true;
    }

    if (newVerti) {
      newY += vy;
      if (newY > maxVerti) newVerti = false;
    } else {
      newY -= vy;
      if (newY < 0) newVerti = true;
    }

    setX(newX);
    setY(newY);
    setHori(newHori);
    setVerti(newVerti);
    setRotation((r) => r + 2.5);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) calculate();
    }, 25);
    return () => clearInterval(interval);
  }, [running, x, y, hori, verti]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === " ") runClick();
      else if (event.key === "1") btnBasketball();
      else if (event.key === "2") btnFootball();
      else if (event.key === "3") btnVoleyball();
      else if (event.key === "4") btnHuman();
      else if (event.key === "5") btnCartoon();
      else if (event.key === "6") btnLogo();
      else if (event.key === "0") setBallSrc(defaultImg);
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-auto bg-white rounded-4 py-3">
      <div className="min-h-screen bg-white d-flex flex-column align-items-center justify-content-center">
        <h2 className="my-4">CALCULATOR</h2>

        <div
          id="container"
          className="border border-dark rounded m-3 p-2 w-fit"
        >
          <style>{`
        #field {
          margin: 10px;
          border-radius: 5px;
          border: 1px solid #000;
          background-image: url('${fieldImg}');
          background-position: center;
          position: relative;
          overflow: hidden;
          width: ${fieldWidth}px;
          height: ${fieldHeight}px;
        }
        #ball {
          position: absolute;
          border-radius: 50%;
          background-color: aliceblue;
          object-fit: cover;
          overflow: hidden;
          transform-origin: center;
          width: ${diameter}px;
          height: ${diameter}px;
          left: ${x}px;
          top: ${y}px;
          transform: rotate(${rotation}deg);
        }
        #control {
          margin: 20px;
        }
        button {
          width: 100px;
        }
      `}</style>

          <div id="field">
            <img id="ball" src={ballSrc} alt="ball" />
          </div>

          <div id="control" className="d-flex flex-wrap justify-content-center">
            <button
              id="run"
              className={`btn ${
                running ? "btn-danger" : "btn-success"
              } me-2 mb-2`}
              onClick={runClick}
            >
              {running ? (
                <span className="bi bi-pause-fill"> PAUSE</span>
              ) : (
                <span className="bi bi-play-fill">&nbsp;RUN</span>
              )}
            </button>

            <button className="btn btn-primary me-2 mb-2" onClick={() => setBallSrc(defaultImg)}>
              None
            </button>
            <button
              className="btn btn-primary me-2 mb-2"
              onClick={btnBasketball}
            >
              Basketball
            </button>
            <button className="btn btn-primary me-2 mb-2" onClick={btnFootball}>
              Football
            </button>
            <button
              className="btn btn-primary me-2 mb-2"
              onClick={btnVoleyball}
            >
              Voleyball
            </button>
            <button className="btn btn-primary me-2 mb-2" onClick={btnHuman}>
              Human
            </button>
            <button className="btn btn-primary me-2 mb-2" onClick={btnCartoon}>
              Cartoon
            </button>
            <button className="btn btn-primary me-2 mb-2" onClick={btnLogo}>
              Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
