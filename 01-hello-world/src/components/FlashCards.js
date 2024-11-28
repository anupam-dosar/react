import { useState } from "react";

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question: "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

export default function FlashCards() {
  const [current, setCurrent] = useState(0);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => setCurrent(current === q.id ? 0 : q.id)}
          style={{
            width: "30%",
            height: "150px",
            display: "flex",
            border: "solid",
            borderColor: "#cccccc",
            borderWidth: "1px",
            borderRadius: "8px",
            margin: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
            color: current === q.id ? "white" : "black",
            backgroundColor: current === q.id ? "red" : "transparent",
          }}
        >
          {current === q.id ? q.answer : q.question}
        </div>
      ))}
    </div>
  );
}
