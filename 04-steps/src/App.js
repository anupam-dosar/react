import { useState } from "react";
import "./index.css";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrev() {
    setStep((s) => (s <= 1 ? 1 : s - 1));
  }
  function handleNext() {
    setStep((s) => (s >= messages.length ? messages.length : s + 1));
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button style={{ backgroundColor: "#7950f2", color: "white" }} onClick={handlePrev}>
              Previous
            </button>
            <button style={{ backgroundColor: "#7950f2", color: "white" }} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
