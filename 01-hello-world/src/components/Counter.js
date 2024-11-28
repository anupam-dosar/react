import React, { useState } from "react";

export default function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function processStep(s) {
    setStep(s);
  }
  function processCount(direction) {
    setCount((c) => (direction ? c + step : c - step));
  }
  function resetApp() {
    setStep(1);
    setCount(0);
  }

  let today = new Date(new Date().getTime() + count * 24 * 3600 * 1000);

  return (
    <div style={{ margin: "auto", width: "300px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <button onClick={() => processStep(false)}>-</button>
        <p>Step: {step}</p>
        <button onClick={() => processStep(true)}>+</button> */}
        <input
          type="range"
          min={1}
          max={30}
          value={step}
          onChange={(e) => {
            processStep(+e.target.value);
          }}
        />
        {step}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => processCount(false)}>-</button>
        <input type="number" value={count} onChange={(e) => setCount(+e.target.value)} />
        <button onClick={() => processCount(true)}>+</button>
      </div>

      <p>
        {count === 0
          ? "Today is"
          : count > 0
          ? `${count} days from today is`
          : `${Math.abs(count)} days ago was`}{" "}
        {today.toDateString()}
      </p>
      {step === 1 && count === 0 ? null : <button onClick={resetApp}>Reset</button>}
    </div>
  );
}
