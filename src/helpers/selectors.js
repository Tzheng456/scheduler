//function which takes state and day, returns a list of appointments from day in state.days which matches day
const getAppointmentsForDay = (state, day) => {
  //empty appointments array to populate later
  let appointmentsArray = [];

  //check each day in state.days for day whose name value matches day
  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      //if matches, then push the appointment from state (using each currentDay.appointments which is an id) into appointmentsArray
      currentDay.appointments.forEach((appointmentId) => {
        appointmentsArray.push(state.appointments[appointmentId]);
      });
    }
  }
  return appointmentsArray;
};

//function which takes state and day, returns a list of interviewers from day in state.days which matches day
const getInterviewersForDay = (state, day) => {
  //empty interviewers array to populate later
  let interviewersArray = [];

  //check each day in state.days for day whos name value matches day
  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      //if matches, then push the interviewer from state (using each currentDay.interviewers which is an id) into interviewersArray
      currentDay.interviewers.forEach((interviewId) => {
        interviewersArray.push(state.interviewers[interviewId]);
      });
    }
  }
  return interviewersArray;
};

//function which takes state and interview, returns a new interview object with updated interviewer from state, or null if interview does not exist
const getInterview = (state, interview) => {
  if (interview) {
    const interviewerId = interview.interviewer;
    return { ...interview, interviewer: state.interviewers[interviewerId] };
  }
  return null;
};

export { getAppointmentsForDay, getInterviewersForDay, getInterview };
