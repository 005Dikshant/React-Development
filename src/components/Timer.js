import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { dispatch, secondRemaining } = useQuiz();

  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(() => {
    const time = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(time);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
