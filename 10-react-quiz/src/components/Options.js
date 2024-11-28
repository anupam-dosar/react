import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index, answer, dispatch } = useQuiz();

  return (
    <div className="options">
      {questions[index].options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer !== null && (i === questions[index].correctOption ? "correct" : "wrong")
          }`}
          key={`opt${i}`}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
