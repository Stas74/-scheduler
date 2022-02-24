import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {
  
  console.log("Appointment interview", props.interview);
  
  const formatTime = (props) => {
    if (!props.time) {
      return "No Appointments";
    } else {
      return `Appointments at ${props.time}`;
    }
  };
  // {props.time ? `Appointments at ${props.time}` : "No Appointments"}
  // {formatTime(props)}
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
      {/* {props.interview ? <Appointment /> : <Empty />} */}
    </article>
  );
}
