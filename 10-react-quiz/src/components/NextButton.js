import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { index, questionCount, answer, dispatch } = useQuiz();

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
