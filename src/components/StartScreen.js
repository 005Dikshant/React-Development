import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const { numOfQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numOfQuestions} Questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
