import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // console.log("Appointment(props.interview)", props.interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    console.log("save interview", interview);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteAppo(id) {
    transition(DELETING, true);
    console.log("delete appointment inside");
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  let nameStudent = "";
  if (props.interview) {
    nameStudent = props.interview.student;
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={nameStudent}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          save={save}
          onConfirm={() => deleteAppo(props.id)}
        />
      )}
      {mode === EDIT && (
        <Form
          interview={props.interview}
          interviewers={props.dailyInterviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Error of saving appointment"} onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error of deleting appointment"}
          onClose={() => back()}
        />
      )}
    </article>
  );
}
