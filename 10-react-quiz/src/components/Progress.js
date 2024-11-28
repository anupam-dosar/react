import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, questionCount, points, totalPoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress max={questionCount - 1} value={answer === null ? index : index + 1} />
      <p>
        Question <strong>{index + 1}</strong>/{questionCount}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
