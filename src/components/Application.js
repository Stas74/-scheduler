import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "../helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];
// Managing State chapter

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const listAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      console.log("all[2].data", all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  // console.log("Spread", { ...listAppointments });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
