import React from "react";

export default function Progress({
  index,
  numOfQuestions,
  points,
  totalPoints,
  answer,
}) {
  console.log("hello");
  return (
    <div>
      <header className="progress">
        <progress
          max={numOfQuestions}
          value={index + Number(answer !== null)}
        />
        <p>
          Questions <strong>{index + 1}</strong> / {numOfQuestions}
        </p>
        <p>
          <strong>{points}</strong> / {totalPoints} points
        </p>
      </header>
    </div>
  );
}
