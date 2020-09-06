import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { selectMeetingDate, getMeetingByTime } from "./lib/index.js"

function App() {
  const dayOptions = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]; 
  const hourOptions = Array.from(Array(12), (_, i) => `${i + 1}:00`)
  const minuteOptions = Array.from(Array(59), (_, i) => `00:${i + 1}`)

  const defaultValues = {day: "Sunday", hour: "1:00", minute: "00:00", AmPm: "AM", timezone: -1 * (new Date().getTimezoneOffset()/60)}

  const [time, setTime] = useState(defaultValues);

  const _onSelect = (date, key) => {
    return setTime({...time, [key]: date.value});
  }
  const _onGoBack = () => window.location.href = "/";

  const _onSubmit = () => {
    console.log({
      day: time.day, 
      hour: Number(time.hour.split(":")[0]) || 1, 
      minute: Number(time.minute.split(":")[1]) || 0, 
      timezone: time.timezone
    });
    const selectedTime = selectMeetingDate({ 
      day: time.day, 
      hour: Number(time.hour.split(":")[0]) || 1, 
      minute: Number(time.minute.split(":")[1]) || 0, 
      timezone: time.timezone
    });
    console.log(selectedTime);
    window.location.href = selectedTime.link;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 

        {
        window.location.href.indexOf('?time=') > -1 
          ? <wrapper> 
              <div>{getMeetingByTime(Number(window.location.href.split('?time=')[1])).message}</div>
              <div id="back-btn" onClick={_onGoBack}> Go back </div>
            </wrapper>
          : <wrapper>
              <div>Select a day</div>
              <Dropdown
                options={dayOptions}
                onChange={(data) => _onSelect(data, 'day')}
                value={dayOptions[0]}
                placeholder="Select a Day"
              />
              <div>Select a Hour</div>
              <Dropdown
                options={hourOptions}
                onChange={(data) => _onSelect(data, 'hour')}
                value={"1:00"}
                placeholder="Select an Hour"
              />
              <div>Select a AM/PM</div>
              <Dropdown
                options={['AM', 'PM']}
                onChange={(data) => _onSelect(data, 'AmPm')}
                value={"AM"}
                placeholder="Select an Hour"
              />
              <div>Select a Minute</div>
              <Dropdown
                options={minuteOptions}
                onChange={(data) => _onSelect(data, 'minute')}
                value={"00:00"}
                placeholder="Select a Minute"
              />
              <div id="submit-btn" onClick={_onSubmit}> submit </div>
            </wrapper>
        }
      </header>
    </div>
  );
}

export default App;
