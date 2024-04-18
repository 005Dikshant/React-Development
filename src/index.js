import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "OK", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} color="red" size={20} defaultRating={6} />
  </React.StrictMode>
);
