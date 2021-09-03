export function getAppointmentsForDay(state, day) {
  let appointmentsIdArray = [];
  let appointmentsArray = [];
  for (const day of state.days) {
    if ((day.name = day)) appointmentsIdArray = day.appointments;
  }
  appointmentsIdArray.forEach((appointmentId) => {
    appointmentsArray.push(state.appointments[appointmentId]);
  });

  return appointmentsArray;
}
