import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useApplicationData(initial) {
  //initialize state with day, days, appointments, interviewers fields
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  //function which sets the day to day state
  const setDay = (day) => setState({ ...state, day });

  //axios api calls for days, appointments, interviewers
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      //resolve all api calls, then update state using the values from the response for days, appointments, interviewers
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  //function which updates the spots remaining for a day
  //takes state and appointments, returns an array of newDays containing days with updated spot count values for each day
  function updateSpots(state, appointments) {
    //find the index of day in state.days corresponding to state.day
    const index = state.days.findIndex((day) => day.name === state.day);

    //thisDay is the day that is selected
    const thisDay = state.days[index];

    //spots counter variable
    let spots = 0;

    //loop through the appointments in the selected day, taking each appointment id and searching
    //if the corresponding appointment in appointments has a null interview, in which case spots is incremented
    for (const id of thisDay.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    //spots is updated for thisDay with new spots value (number of null interviews in appointments)
    const day = { ...thisDay, spots };

    //maps the day with matching name to state.day with day if true or obj if false
    const newDays = state.days.map((obj) => (obj.name === state.day ? day : obj));

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

    const days = updateSpots(state, appointments);

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments, days: days }));
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
    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`, { interview: null }).then(() => {
      setState((prev) => ({ ...prev, appointments, days: days }));
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
