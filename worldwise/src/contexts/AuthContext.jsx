import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initState = {
  user: null,
  isAuth: false,
  error: "",
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true, error: "" };

    case "logout":
      return { ...state, user: null, isAuth: false, error: "" };

    case "login/failed":
      return { ...state, user: null, isAuth: false, error: "Invalid email/password!" };

    default:
      throw new Error("Unknown action!");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth, error }, dispatch] = useReducer(reducer, initState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "login/failed" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuth: isAuth,
        error: error,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext has been used outside AuthProvider!");
  return context;
}

export { AuthProvider, useAuth };
