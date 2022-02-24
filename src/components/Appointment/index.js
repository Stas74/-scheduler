import React from "react";

import "./styles.scss";

export default function Appointment(props) {
  const formatTime = (props) => {
    if (!props.time) {
      return "No Appointments";
    } else {
      return `Appointments at ${props.time}`;
    }
  };

  return <article className="appointment">{formatTime(props)}</article>;
}
