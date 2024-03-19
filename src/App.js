import { useState } from "react";

export default function App() {
  return <Counter />;
}

function Counter() {
  const date = new Date();
  const [count, setCount] = useState(0);
  date.setDate(date.getDate() + count);

  const [state, setState] = useState(1);

  return (
    <div>
      <div>
        <input
          type="range"
          value={state}
          min="0"
          max="10"
          onChange={(e) => {
            setState(Number(e.target.value));
          }}
        />
        <span>Step: {state}</span>
      </div>
      <div>
        <button onClick={() => setCount((c) => c - state)}>-</button>
        <input
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((c) => c + state)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} day from  today is `
            : `${count} day ago was `}
        </span>
        {date.toDateString()}
      </p>

      {count !== 0 || state !== 1 ? (
        <button
          onClick={() => {
            setCount(0);
            setState(1);
          }}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
