import{ useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // console.log("setDay days", state.days)

  function updateSpots(id, increment = true) {
    let day = state.days.filter((day) => day.appointments.includes(id))[0];
    if (increment) {
      day.spots += 1;
    } else {
      day.spots -= 1;
    }
    const days = [...state.days];
    const dayIndex = day.id - 1;
    days[dayIndex] = day;

    return days;
  }

  function bookInterview(id, interview) {
    // console.log(bookInterview, id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then(() => {
        const days = updateSpots(id, false);
        setState({ ...state, appointments, days });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, { interview: id })
      .then(() => {
        const days = updateSpots(id, true);
        setState({ ...state, appointments, days });
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("/api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      // console.log("all[2].data", all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
