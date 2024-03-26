import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Step />
      <StepMessage step={1}>
        <p>Welcome to world of narnia</p>
      </StepMessage>

      <StepMessage step={2}>
        <p>Please stop and watch anime</p>
      </StepMessage>
    </>
  );
}

function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* <p className="message">
            Step {step} : {messages[step - 1]}
          </p> */}

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                textColor="blue"
                bgColor="#795"
                text={messages[step - 1]}
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
                emoji="😎"
              >
                Previous<span>👈</span>
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              text="Previous"
              onClick={handlePrevious}
              emoji="👈"
            >
              Previous<span>👈</span>
            </Button>

            <Button
              textColor="#fff"
              bgColor="#7950f2"
              text="Next"
              onClick={handleNext}
              emoji="👉"
            >
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>
        Step {step} : {children}
      </h3>
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
