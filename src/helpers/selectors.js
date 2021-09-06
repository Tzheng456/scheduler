const getAppointmentsForDay = (state, day) => {
  let appointmentsArray = [];
  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      currentDay.appointments.forEach((appointmentId) => {
        appointmentsArray.push(state.appointments[appointmentId]);
      });
    }
  }
  return appointmentsArray;
};

const getInterviewersForDay = (state, day) => {
  let interviewersArray = [];
  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      currentDay.interviewers.forEach((interviewId) => {
        interviewersArray.push(state.interviewers[interviewId]);
      });
    }
  }
  return interviewersArray;
};

const getInterview = (state, interview) => {
  if (interview) {
    const interviewerId = interview.interviewer;
    return { ...interview, interviewer: state.interviewers[interviewerId] };
  }
  return null;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
