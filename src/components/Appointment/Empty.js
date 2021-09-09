import React from 'react';

export default function Empty(props) {
  //returns the empty mode which contains a single add button handled by onClick
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
