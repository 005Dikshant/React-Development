import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
  const { index, numOfQuestions, points, totalPoints, answer } = useQuiz();
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
