import { createRoot } from "react-dom/client";

const name = "Greeshu";
const age = 20;
const message = (
  <span>Hello, my name is {name} and I am {age} years old.</span>
);
createRoot(document.getElementById("root")).render(
  <div>
    <h1>JSX Render App</h1>
    <p>{message}</p>
  </div>,
);