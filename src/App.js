import React from "react";
import "./App.css";
import List from "./components/List/List";
import Icon from "./assets/stackoverflow.png";

function App() {
  return (
    <div>
      <header className="header">
        <div >
          <img className="icon" src={Icon} alt="icon" />
        </div>
        <span>Stack Overflow Questions</span>
      </header>
      <List />
    </div>
  );
}

export default App;
