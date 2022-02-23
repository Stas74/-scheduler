import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log("props DayListItem", props)
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (props) => {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return `1 spot remaining`;
    }
    return `${props.spots} spots remaining`;
  };

  return (
    <li className={dayClass} key={props.id} onClick={() => props.setDay(props.name)}>
      {/* {console.log(props)} */}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
