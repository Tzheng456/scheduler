import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  //states of name, interviewer, and error, with initial values if exists
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  //a function that resets the name and interviewer states to initial values
  function reset() {
    setName('');
    setInterviewer(null);
  }

  //a function that clears name and interviewer state, then calls props.onCancel()
  function cancel() {
    reset();
    props.onCancel();
  }

  //a function that checks if the name state is empty string and returns an error if it is
  //else error state is "" and props.onSave is called with the name and interviewer state
  function validate() {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }

    setError('');
    props.onSave(name, interviewer);
  }

  //returns a Form component containing an input field that displays the name state, and whose onChange events setName()
  //and InterviewierList containing all the interviewers and selected interviewer, changed by onChange
  //and a cancel button calling cancel function, and save button, calling validate on click
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(id) => {
            setInterviewer(id);
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
