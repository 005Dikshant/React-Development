import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, totalPoints: maxPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage < 100 && percentage >= 80) emoji = "🎉";
  else if (percentage < 80 && percentage >= 50) emoji = "🙃";
  else if (percentage > 0 && percentage < 50) emoji = "🤨";
  else emoji = "🤦";
  return (
    <>
      <p className="result">
        <span> {emoji} </span>You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
