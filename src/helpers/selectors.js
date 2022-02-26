export default function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find((elem) => elem.name === day);

  if (dayObj === undefined) return [];

  return dayObj.appointments.map((app) => state.appointments[app]);
}
