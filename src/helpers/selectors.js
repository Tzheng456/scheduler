const getAppointmentsForDay = (state, day) => {
  let appointmentsIdArray = [];
  let appointmentsArray = [];
  for (const currentDay of state.days) {
    if (currentDay.name === day) appointmentsIdArray = currentDay.appointments;
  }
  appointmentsIdArray.forEach((appointmentId) => {
    appointmentsArray.push(state.appointments[appointmentId]);
  });

  return appointmentsArray;
};

const getInterview = (state, interview) => {
  if (interview) {
    const interviewerId = interview.interviewer;
    interview.interviewer = state.interviewers[interviewerId];
    return interview;
  }

  return null;
};

export { getAppointmentsForDay, getInterview };
