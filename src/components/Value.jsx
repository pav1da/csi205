import { useEffect } from "react";

const Value = ({ name, initial, type, value, setValue }) => {
  useEffect(() => {
    if (setValue) {
      setValue(initial || 0);
    }
  }, [initial]);

  return (
    <div
      className="border border-black border-2 rounded-4 mx-auto p-3 mt-3 px-3"
      style={{ width: "fit-content" }}
    >
      <h2 className="text-primary text-center pb-3">{name || "VALUE"}</h2>
      <div className="d-flex justify-content-between align-item-center gap-4">
        <button
          className="btn btn-danger px-3"
          onClick={() => setValue && setValue((p) => p - 1)}
        >
          &minus;
        </button>
        <div className="fs-3 px-4">
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>
        <button
          className="btn btn-success px-3"
          onClick={() => setValue && setValue((p) => p + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Value;