import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, setDay, day } = props;
  
  const arrDays = days.map((dayItem) => <DayListItem{...dayItem} key={dayItem.id} 
  selected={dayItem.name === day} setDay={setDay} />);
  return (
    <ul>{arrDays}</ul>
    
  )
}