const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find((elem) => elem.name === day);

  if (dayObj === undefined) return [];

  return dayObj.appointments.map((app) => state.appointments[app]);
};

const getInterviewersForDay = (state, day) => {

  const dayObjInterviewers = state.days.find((elem) => elem.name === day);

  if (dayObjInterviewers === undefined) return []; 

  return dayObjInterviewers.interviewers.map((int) => state.interviewers[int]);  
};

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewObj = state.interviewers[interviewerId];

  return { student: interview.student, interviewer: interviewObj };
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
