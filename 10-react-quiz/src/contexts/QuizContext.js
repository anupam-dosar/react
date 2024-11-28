import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";

const APIBASE = "http://localhost:8000/";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SEC_PER_Q = 30;

function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return { ...state, questions: action.payload, status: "ready" };

    case "fetchFailed":
      return { ...state, status: "error" };

    case "startQuiz":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SEC_PER_Q };

    case "newAnswer":
      const q = state.questions[state.index];
      const points = q.correctOption === action.payload ? q.points : 0;
      return { ...state, answer: action.payload, points: state.points + points };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...state, status: "ready", index: 0, answer: null, points: 0, secondsRemaining: 10 };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action!");
  }
}

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${APIBASE}questions`);
        const questions = await res.json();
        dispatch({ type: "setQuestions", payload: questions });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "fetchFailed" });
      } finally {
      }
    }

    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        questionCount: questions.length,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("QuizContext outside QuizProvider boundary!");
  return context;
}

export { QuizProvider, useQuiz };
