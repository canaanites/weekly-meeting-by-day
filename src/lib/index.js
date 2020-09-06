const selectMeetingDate = ({
  day = "Sunday",
  hour = 0,
  minute = 0,
  timezone = -1 * (new Date().getTimezoneOffset()/60) // try to avoid changing this value, but if you do stick to one timezone (ex. -5)
}) => {
  const dayToInt = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const intToDay = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const numberOfTheDay = dayToInt[`${day}`.toLowerCase()] || 0;

  const today = new Date();

  const meetingDate = new Date(
    `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}Z${hour}:${minute}${0 > timezone ? "-" : "+"}${Math.abs(timezone)}`
  );
  meetingDate.setTime(
    meetingDate.getTime() + (numberOfTheDay + 1) * 24 * 60 * 60 * 1000
  );
  const meetingDate_wtihTimeZone = meetingDate.toLocaleString(
    Intl.DateTimeFormat().resolvedOptions().locale,
    { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
  );

  const meetingInfo = {
    day: intToDay[meetingDate.getDay()],
    time: `${meetingDate_wtihTimeZone.split(" ")[1].slice(0, -3)} ${meetingDate_wtihTimeZone.split(" ")[2]}`,
    localTimeZone: /\((.*)\)/.exec(today.toString())[1],
    nextEventDate: meetingDate_wtihTimeZone.split(" ")[0].slice(0, -1),
    date: meetingDate_wtihTimeZone.split(" ")[0].replace(",", "."),
  };
  const meetingTime = `${meetingInfo.day} ${meetingInfo.time} (${meetingInfo.localTimeZone})`;
  today.setUTCSeconds(0);
  meetingDate.setUTCSeconds(0);

  // todo: return link?
  function getMessage(message) {
    return {
      message,
      day: meetingInfo.day,
      time: meetingInfo.time,
      nextEventDate: meetingInfo.nextEventDate,
      localTimeZone: meetingInfo.localTimeZone,
      link: `/?time=${meetingDate.getTime()}`,
    };
  }

  if (
    numberOfTheDay === today.getDay() &&
    hour === today.getHours() &&
    minute > today.getMinutes()
  ) {
    return getMessage(
      `The event will start in ${minute - today.getMinutes()} min.`
    );
  }

  return getMessage(
    `The event starts on every ${meetingTime}. Next event is on ${meetingInfo.nextEventDate}`
  );
};

// run
// selectMeetingDate({ day: "Monday", hour: 14, minute: 30 });


const getMeetingByTime = (time) => {
    const selectedTime = new Date(time);
    console.log({ day: selectedTime.getDay(), hour: selectedTime.getHours(), minute: selectedTime.getMinutes() })
    return selectMeetingDate({ day: selectedTime.getDay(), hour: selectedTime.getHours(), minute: selectedTime.getMinutes() });
}

export { selectMeetingDate, getMeetingByTime };