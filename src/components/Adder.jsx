import { useState } from "react";
import Value from "./Value";

const Adder = ({ name }) => {

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div
      className="border border-black border-2 rounded-4 mx-auto p-3 mt-3 px-3"
      style={{ width: "fit-content" }}
    >
      <h2 className="text-center text-primary pb-4">{name || 'ADDER'}</h2>
      <div className="d-flex justify-content-between gap-4 mb-3 align-items-center">
        <div className="badge bg-secondary py-3 px-4 fs-6">A = {a}</div>
        <div className="badge bg-primary py-3 px-4 fs-6">A + B = {a + b}</div>
        <div className="badge bg-secondary py-3 px-4 fs-6">B = {b}</div>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <Value name={"A"} value={a} setValue={setA}/>
        <Value name={"B"} value={b} setValue={setB}/>
      </div>
    </div>
  );
};

export default Adder;
