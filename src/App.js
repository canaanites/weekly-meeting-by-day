import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function App() {
  const dayOptions = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]; 
  const hourOptions = Array.from(Array(12), (_, i) => `${i + 1}:00`)
  const minuteOptions = Array.from(Array(59), (_, i) => `00:${i + 1}`)


  const [time, setTime] = useState();

  const _onSelect = (date, key) => {
    return setTime({[key]: date.value});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Dropdown
          options={dayOptions}
          onChange={_onSelect}
          value={dayOptions[0]}
          placeholder="Select Day"
        />
        <Dropdown
          options={hourOptions}
          onChange={_onSelect}
          value={"1:00"}
          placeholder="Select Hour"
        />
        <Dropdown
          options={minuteOptions}
          onChange={_onSelect}
          value={"00:00"}
          placeholder="Select Minute"
        />
      </header>
    </div>
  );
}

export default App;
