import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
import { useQuiz } from "../contexts/QuizContext.js";

export default function App() {
  const { status } = useQuiz();

  return (
    <div>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextQuestion />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
