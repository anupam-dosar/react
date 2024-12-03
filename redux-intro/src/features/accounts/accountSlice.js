const initialAccState = {
  balance: 0,
  loan: 0,
  purpose: "",
  isLoading: false,
};

const ACTION_DEPOSITE = "account/deposite";
const ACTION_WITHDRAW = "account/withdraw";
const ACTION_REQLOAN = "account/loan/request";
const ACTION_PAYLOAN = "account/loan/payment";
const ACTION_CURRENCYC = "account/currency/conversion";

const APIBASE = "https://api.frankfurter.dev/v1/";

export default function accountReducer(state = initialAccState, action) {
  switch (action.type) {
    case ACTION_DEPOSITE:
      return { ...state, balance: state.balance + action.payload, isLoading: false };

    case ACTION_WITHDRAW:
      return { ...state, balance: state.balance - action.payload };

    case ACTION_REQLOAN:
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        purpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case ACTION_PAYLOAN:
      return { ...state, loan: 0, purpose: "", balance: state.balance - state.loan };

    case ACTION_CURRENCYC:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposite(amount, currency) {
  if (currency === "USD") return { type: ACTION_DEPOSITE, payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: ACTION_CURRENCYC });

    const res = await fetch(`${APIBASE}latest?amount=${amount}&base=${currency}&symbols=USD`);
    const data = await res.json();
    // console.log(data.rates.USD);
    dispatch({ type: ACTION_DEPOSITE, payload: data.rates.USD });
  };
}
export function withdraw(amount) {
  return { type: ACTION_WITHDRAW, payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: ACTION_REQLOAN, payload: { amount: amount, purpose: purpose } };
}
export function payLoan() {
  return { type: ACTION_PAYLOAN };
}
