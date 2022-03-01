const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find((elem) => elem.name === day);

  if (dayObj === undefined) return [];

  return dayObj.appointments.map((app) => state.appointments[app]);
};

// const getInterviewersForDay = (state, day) => {
//   const dayObj = state.days.find((elem) => elem.name === day);

//   if (dayObj === undefined) return [];

//   return dayObj.appointments.map((app) => state.appointments[app]);
// };


const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  
  // const interviewerId = interview.interviewer;
  // const interviewObj = state.interviewers[interviewerId];

  // return { student: interview.student, interviewer: interviewObj };
};


export { getAppointmentsForDay, getInterview };
