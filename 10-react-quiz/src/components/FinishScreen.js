import { useQuiz } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();

  return (
    <>
      <p className="result">
        <span>🪧</span>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil((points / totalPoints) * 100)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
