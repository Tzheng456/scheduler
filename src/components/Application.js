import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState((prev) => ({ ...prev, days }));
  useEffect(() => {
    axios.get('/api/days').then((response) => {
      // setState({ ...state, days: response.data });
      setDays(response.data);
    });
  }, []);
  const appointmentsMapped = [state.appointments].map((appointment) => (
    <Appointment
      key={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      onAdd={props.onAdd}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    />
  ));
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{' '}
      </section>
      <section className="schedule">{appointmentsMapped}</section>
    </main>
  );
}
