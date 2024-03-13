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
        <button onClick={() => setState((s) => s - 1)}>-</button>
        <span>State: {state}</span>
        <button onClick={() => setState((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setCount((c) => c - state)}>-</button>
        <span>Count: {count}</span>
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
    </div>
  );
}
