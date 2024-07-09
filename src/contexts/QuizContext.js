import { useContext, useReducer, createContext, useEffect } from "react";

const QuizesContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // loading,ready,active,error,finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "restart":
      // return { ...state, status: "ready", index: 0, answer: null, points: 0 };
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining - 1 === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("action unknown");
  }
}

function QuizContext({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => {
        dispatch({ type: "dataFailed" });
        console.error(err);
      });
  }, []);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => {
    return (acc += question.points);
  }, 0);

  return (
    <QuizesContext.Provider
      value={{
        question: questions.at(index),
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        dispatch,
        numOfQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizesContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizesContext);
  if (context === undefined) {
    throw new Error("Quiz context is being used outside the scope");
  }

  return context;
}

export { QuizContext, useQuiz };
