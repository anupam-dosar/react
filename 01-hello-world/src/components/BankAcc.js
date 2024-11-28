import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  error: "",
};

const initialBalance = 500;

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: initialBalance };

    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      return {
        ...state,
        balance: action.payload > state.balance ? 0 : state.balance - action.payload,
      };

    case "requestLoan":
      if (state.balance > action.payload) {
        return {
          ...state,
          loan: action.payload,
          balance: state.balance - action.payload,
          error: "",
        };
      } else {
        return { ...state, error: "Request denied! Insufficient balance." };
      }

    case "payLoan":
      let balance = state.loan - action.payload;
      return {
        ...state,
        loan: balance < 0 ? 0 : state.loan - action.payload,
        balance: balance < 0 ? state.balance + Math.abs(balance) : state.balance,
      };

    case "closeAccount":
      return { ...initialState };

    default:
      throw new Error("Unknown action!");
  }
}

export default function BankAcc() {
  const [{ balance, loan, isActive, error }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <button onClick={() => dispatch({ type: "openAccount" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "deposit", payload: 150 })} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "withdraw", payload: 50 })} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({ type: "payLoan", payload: 100 })} disabled={loan === 0}>
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!(balance === 0 && loan === 0) || !isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
