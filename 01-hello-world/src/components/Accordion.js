import { useState } from "react";
import "../accordion.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function Accordion() {
  const [isOpen, setOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((q, i) => (
        <AccordionItem
          number={i}
          title={q.title}
          key={i}
          isOpen={isOpen === i}
          handleClick={() => setOpen(isOpen === i ? null : i)}
        >
          {q.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ number, title, isOpen, handleClick, children }) {
  return (
    <div className={`item ${isOpen ? "open" : ""}`} key={number} onClick={handleClick}>
      <p className="number">
        {number < 9 ? "0" : ""}
        {number + 1}
      </p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <p className="content-box">{children}</p> : ""}
    </div>
  );
}
