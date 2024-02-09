import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Card />
  </React.StrictMode>
);

const skillsList = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "Javascript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and Github",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function Card() {
  return (
    <div className="card">
      <Avatar photo="dev.jpg" name="dev photo" />
      <Description />
      <div className="skill-list">
        {skillsList.map(({ skill, color, level }) => (
          <Skills
            emoji={
              level === "advanced"
                ? "💪"
                : skill === "intermediate"
                ? "👍"
                : "👶"
            }
            skill={skill}
            level={level}
            color={color}
            key={skill}
          />
        ))}
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <>
      <img className="avatar" src={props.photo} alt={props.name}></img>
    </>
  );
}

function Description() {
  return (
    <div className="data">
      <h1> Dikshant Yadav </h1>
      <p>
        Full Stack web developer and teacher at udemy. when not coding or
        preparing a course, I like to play the board games, to cook(and eat), or
        to just enjoy the portguese sun at the beach.
      </p>
    </div>
  );
}

function Skills({ skill, color, emoji }) {
  return (
    <button className="skill" style={{ backgroundColor: color }}>
      {skill} {emoji}
    </button>
  );
}
