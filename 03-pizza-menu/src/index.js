import React from "react";
import ReactDOM from "react-dom";
import { pizzaData } from "./data";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Menu</h2>
      {pizzaData.length ? (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza data={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p>Sorry! No pizzas available atm!!</p>
      )}
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      <div className="order">
        {isOpen ? (
          <>
            <p>We're currently open!</p>
            <button className="btn">Order</button>
          </>
        ) : (
          <p>Closed atm! CYA@{openHour}:00</p>
        )}
        <p>
          Open hours {openHour}:00 - {closeHour}:00
        </p>
      </div>
    </footer>
  );
}

function Pizza({ data }) {
  return (
    <li className={`pizza ${data.soldOut ? "sold-out" : ""}`}>
      <img src={data.photoName} alt={data.name} />
      <div>
        <h3>{data.name}</h3>
        <p>{data.ingredients}</p>
        <span>{data.soldOut ? "SOLD OUT" : `$${data.price}`}</span>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
