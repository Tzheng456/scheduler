export function getAppointmentsForDay(state, day) {
  let appointmentsIdArray = [];
  let appointmentsArray = [];
  for (const currentDay of state.days) {
    if (currentDay.name === day) appointmentsIdArray = currentDay.appointments;
  }
  appointmentsIdArray.forEach((appointmentId) => {
    appointmentsArray.push(state.appointments[appointmentId]);
  });

  return appointmentsArray;
}
