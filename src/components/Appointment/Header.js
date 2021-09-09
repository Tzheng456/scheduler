import React from 'react';

export default function Header(props) {
  //returns a header containing just the time of an appointment
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}
