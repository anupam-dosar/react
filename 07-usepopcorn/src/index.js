import React from "react";
import ReactDOM from "react-dom/client";
import Rating from "./components/StarRating/Rating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Rating
      max="5"
      size={24}
      customMessages={["Horrible", "Poor", "Okay", "Satisfactory", "Outstanding"]}
      onSetRating={() => {}}
    />
    <Rating max="10" size={32} color="#ff1234" defaultRating={8} onSetRating={() => {}} /> */}
  </React.StrictMode>
);
