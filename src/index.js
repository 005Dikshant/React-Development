import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Card />
  </React.StrictMode>
);

function Card() {
  return (
    <div className="card">
      <Avatar photo="dev.jpg" name="dev photo" />
      <Description />
      <Skills
        skillList={[
          ["HTML+CSS 💪", "blue"],
          ["Javascript 💪", "yellow"],
          ["Web Design 💪", "lightgreen"],
          ["Git and Github 👍", "red"],
          ["React 💪", "light blue"],
          ["Svelte 👶", "red"],
        ]}
      />
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

function Skills(props) {
  return (
    <div className="skill">
      {props.skillList.map((data) => {
        return (
          <button
            key={data[0]}
            className="skill-list"
            style={{ backgroundColor: data[1] }}
          >
            {data[0]}
          </button>
        );
      })}
    </div>
  );
}
