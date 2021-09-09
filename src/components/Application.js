import React from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

export default function Application() {
  //destructure state, setDay, bookInterview, cancelInterview from useApplicationData hook
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  //uses selector getInteriewersForDay to return a list of interviewers on the current day
  const interviewers = getInterviewersForDay(state, state.day);

  //uses selector getAppointmentsForDay to get a list of appointments on the current day
  //maps data from each appointment as props of an Appointment component
  //return a list of Appointment components with corresponding information for the current day
  const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        onEdit={bookInterview}
        onDelete={cancelInterview}
        bookInterview={bookInterview}
      />
    );
  });

  //return the Application component containing the DayList component of the current day, and a formatted list of Appointment components
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
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
