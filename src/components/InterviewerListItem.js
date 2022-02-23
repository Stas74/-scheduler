import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const setInterviewerHandler = () => {
    props.setInterviewer(props.id)
  }
  return (
    <li className="interviewers__item" key={props.id} onClick={() => setInterviewerHandler}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
};
