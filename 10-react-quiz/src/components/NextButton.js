function NextButton({ index, questionCount, answer, dispatch }) {
  return (
    answer !== null &&
    (index < questionCount - 1 ? (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    ) : (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finished" })}>
        Finish
      </button>
    ))
  );
}

export default NextButton;
