import React, { useState } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Student 2',
      interviewer: {
        id: 2,
        name: 'Tori Malcolm',
        avatar: 'https://i.imgur.com/Nmx0Qxo.png',
      },
    },
  },
  {
    id: 4,
    time: '3pm',
  },
  {
    id: 5,
    time: '5pm',
  },
];

export default function Application(props) {
  const appointmentsMapped = appointments.map((appointment) => (
    <Appointment
      key={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      onAdd={props.onAdd}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    />
  ));
  const [day, setDay] = useState('Monday');
  const days = [
    {
      id: 1,
      name: 'Monday',
      spots: 2,
    },
    {
      id: 2,
      name: 'Tuesday',
      spots: 5,
    },
    {
      id: 3,
      name: 'Wednesday',
      spots: 0,
    },
  ];
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
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
