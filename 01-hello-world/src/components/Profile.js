import Card from "./Card";

export default function Profile() {
  const person = {
    name: "Anupam Gupta",
    image: { path: "/IMG_20230504_153539.jpg", width: 300 },
    about:
      "Full-stack web application developer and trainer with 10+ years of working experience. When not coding, I like to educate myself with latest in technology, watch si-fi, fantacy web series and movies and spending time with family.",
    skills: [
      { name: "HTML+CSS 🤌", background: "aliceblue" },
      { name: "JavaScript ✌️", background: "aqua" },
      { name: "Web Design 🕸️", background: "blue" },
      { name: "React 👍", background: "blueviolet" },
      { name: "Node 🙌", background: "burlywood" },
      { name: "Next.Js 🤛", background: "red" },
      { name: "Docker 💪", background: "brown" },
      { name: "PHP 😊", background: "violet" },
      { name: "Codeigniter 🔥", background: "forestgreen" },
      { name: "MySql 🛹", background: "pink" },
    ],
  };

  return <Card data={person} />;
}
