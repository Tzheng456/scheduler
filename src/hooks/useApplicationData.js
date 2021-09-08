import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  function updateSpots(appointments) {
    let newDays = [];
    for (const thisDay of state.days) {
      let spots = 0;
      for (const appointmentId of thisDay.appointments) {
        if (appointments[appointmentId].interview === null) {
          spots++;
        }
      }
      const newDay = {
        ...thisDay,
        spots,
      };
      newDays.push(newDay);
    }
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      updateSpots(appointments);
      setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) }));
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
    return axios.delete(`/api/appointments/${id}`, { interview: null }).then(() => {
      setState((prev) => ({ ...prev, appointments, days: updateSpots(appointments) }));
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
