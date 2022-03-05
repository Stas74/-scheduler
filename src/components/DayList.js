import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {  

  const arrDays = props.days.map((dayItem) => (
    <DayListItem
      {...dayItem}
      key={dayItem.id}
      selected={dayItem.name === props.value}
      setDay={props.onChange}
    />
  ));
  return <ul>{arrDays}</ul>;
}
