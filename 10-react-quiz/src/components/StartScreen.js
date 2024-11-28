import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { questionCount, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{questionCount} questions to test your React skills</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "startQuiz" })}>
        Click to Start
      </button>
    </div>
  );
}

export default StartScreen;
