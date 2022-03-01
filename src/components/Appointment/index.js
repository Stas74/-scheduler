import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  console.log("Appointment(props.interview)", props.interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    console.log("save interview", interview);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form          
          interview={props.interview}
          interviewers={props.dailyInterviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {/* {props.interview ? <Appointment /> : <Empty />} */}
    </article>
  );
}
