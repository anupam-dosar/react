function FinishScreen({ score, totalPoints, highscore, dispatch }) {
  return (
    <>
      <p className="result">
        <span>🪧</span>
        You scored <strong>{score}</strong> out of {totalPoints} (
        {Math.ceil((score / totalPoints) * 100)}%)
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
