import React from 'react';

export default function Status(props) {
  //returns a Status component with a loading animation for async calls that take time to respond
  //displays a message passed in from props: typically Saving or Deleting
  return (
    <main className="appointment__card appointment__card--status">
      <img className="appointment__status-image" src="images/status.png" alt="Loading" />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
