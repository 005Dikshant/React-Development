import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function NextQuestion() {
  const { dispatch, answer, index, numOfQuestions } = useQuiz();

  if (answer === null) {
    return;
  }
  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}
