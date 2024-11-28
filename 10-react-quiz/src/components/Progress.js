function Progress({ index, questionCount, score, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={questionCount - 1} value={answer === null ? index : index + 1} />
      <p>
        Question <strong>{index + 1}</strong>/{questionCount}
      </p>
      <p>
        <strong>{score}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
