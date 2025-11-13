import { useState, useEffect } from "react";

const Calculator = () => {
  const THOUSAND_SEPARATOR = " ";

  const [numShow, setNumShow] = useState("0");
  const [state, setState] = useState("s0");
  const [first, setFirst] = useState(0);
  const [operatorCt, setOperatorCt] = useState("?");
  const [second, setSecond] = useState(0);
  const [lastSec, setLastSec] = useState(0);

  const clearBtn = () => {
    return {
      plus: state === "s2" && operatorCt === "+",
      minus: state === "s2" && operatorCt === "-",
    };
  };

  const handleOperator = (operator) => {
    if (state === "s3") {
      handleEqual();
      return;
    }

    if (state === "s1" || state === "resultShow" || state === "s0") {
      setOperatorCt(operator);
      setState("s2");
    } else if (state === "s2") {
      setOperatorCt(operator);
    }
  };

  const handleEqual = () => {
    console.log("=");

    const calculate = (a, b, op) => {
      if (op === "+") return a + b;
      if (op === "-") return a - b;
      return a;
    };

    let result = 0;

    if (state === "s3") {
      const res = calculate(first, second, operatorCt);
      setLastSec(second);
      setNumShow(res.toString());
      setFirst(res);
      setState("resultShow");
    } else if (state === "s2") {
      const res = calculate(first, first, operatorCt);
      setLastSec(first);
      setNumShow(res.toString());
      setFirst(res);
      setState("resultShow");
    } else if (state === "resultShow" && operatorCt !== "?" && lastSec !== 0) {
      const res = calculate(first, lastSec, operatorCt);
      setNumShow(res.toString());
      setFirst(res);
    }
  };

  const handleClear = () => {
    setNumShow("0");
    setState("s0");
    setFirst(0);
    setOperatorCt("?");
    setSecond(0);
    setLastSec(0);
  };

  const handleNumClick = (number) => {
    if (state === "s0" || state === "resultShow") {
      setNumShow(number.toString());
      setFirst(number);
      setState("s1");
    } else if (state === "s1") {
      if (numShow.length < 9) {
        const newNum = numShow + number.toString();
        setNumShow(newNum);
        setFirst(Number(newNum));
      }
    } else if (state === "s2") {
      setNumShow(number.toString());
      setSecond(number);
      setState("s3");
    } else if (state === "s3") {
      if (numShow.length < 9) {
        const newNum = numShow + number.toString();
        setNumShow(newNum);
        setSecond(Number(newNum));
      }
    }
  };

  const renderWithSeparator = (display) => {
    let str = "";
    let count = 0;
    for (let i = display.length - 1; i >= 0; i--) {
      str = display[i] + str;
      count++;
      if (count % 3 === 0 && i !== 0) {
        str = THOUSAND_SEPARATOR + str;
      }
    }
    return str;
  };

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        handleNumClick(Number(event.key));
      } else if (event.key === "+") {
        handleOperator("+");
      } else if (event.key === "-") {
        handleOperator("-");
      } else if (event.key === "Enter" || event.key === "=") {
        handleEqual();
      } else if (event.key === "Escape") {
        handleClear();
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [state, numShow, first, second, operatorCt, lastSec]);

  const btnHighlight = clearBtn();

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-auto bg-white rounded-4 py-3">
      <div className="min-h-screen bg-white d-flex flex-column align-items-center justify-content-center">
        <style>{`
          .calculator {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 400px;
            height: 500px;
            background-color: #fafafa;
            border: 2px solid #000;
            border-radius: 8px;
            padding: 10px;
          }

          .screen {
            width: 100%;
            height: 20%;
            background-color: honeydew;
            border: 2px solid gray;
            border-radius: 6px;
            color: black;
            margin-bottom: 10px;
            display: flex;
            justify-content: right;
            align-items: center;
            padding: 10px;
            font-size: 27px;
            font-weight: bold;
            overflow: hidden;
          }

          .input-panel {
            width: 100%;
            height: 80%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            gap: 5px;
          }

          .box-input {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #000;
            border-radius: 6px;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.1s;
          }

          .box-input:hover:not(:disabled) {
            transform: scale(1.03);
          }

          .box-input:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .clGreen {
            background-color: #d8ffd8;
          }

          .clRed {
            background-color: #ffc3c3;
          }

          .clBlue {
            background-color: #b3ffff;
          }

          .clOrange {
            background-color: #ffc48cff;
          }
        `}</style>

        <h2 className="my-4">CALCULATOR</h2>

        <div className="calculator my-4">
          <div className="screen">{renderWithSeparator(numShow)}</div>
          <div className="input-panel">
            <button className="box-input clGreen" disabled>
              MC
            </button>
            <button className="box-input clGreen" disabled>
              MR
            </button>
            <button className="box-input clGreen" disabled>
              M+
            </button>
            <button className="box-input clGreen" disabled>
              M-
            </button>
            <button className="box-input clRed" onClick={handleClear}>
              C
            </button>

            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(7)}
            >
              7
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(8)}
            >
              8
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(9)}
            >
              9
            </button>
            <button className="box-input clGreen" disabled>
              ÷
            </button>
            <button className="box-input clGreen" disabled>
              √
            </button>

            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(4)}
            >
              4
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(5)}
            >
              5
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(6)}
            >
              6
            </button>
            <button className="box-input clGreen" disabled>
              ×
            </button>
            <button className="box-input clGreen" disabled>
              %
            </button>

            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(1)}
            >
              1
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(2)}
            >
              2
            </button>
            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(3)}
            >
              3
            </button>
            <button
              className={`box-input ${
                btnHighlight.minus ? "clOrange" : "clGreen"
              }`}
              onClick={() => handleOperator("-")}
            >
              -
            </button>
            <button className="box-input clGreen" disabled>
              1/x
            </button>

            <button
              className="box-input clBlue"
              onClick={() => handleNumClick(0)}
            >
              0
            </button>
            <button className="box-input clBlue" disabled>
              .
            </button>
            <button className="box-input clBlue" disabled>
              +/−
            </button>
            <button
              className={`box-input ${
                btnHighlight.plus ? "clOrange" : "clGreen"
              }`}
              onClick={() => handleOperator("+")}
            >
              +
            </button>
            <button className="box-input clGreen" onClick={handleEqual}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
