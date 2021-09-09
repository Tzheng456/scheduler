import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  //mode constants
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  //destructure mode, transition and back from useVisualMode hook, initialize as SHOW if interview exists, EMPTY if not
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  //function which takes new name and interviewer, then creates an interview object which is passed to props.bookInterview
  //transitions between modes: SAVING, SHOW if bookInterview resolves with no error, ERROR_SAVE (replace last mode in history)) if error is caught
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((res) => {
        transition(ERROR_SAVE, true);
      });
  }

  //function which passes the id to onDelete to delete an interview
  //transitions to DELETING (replace last mode in history) then to EMPTY if resolves with no error, to ERROR_DELETE (replace last mode in history) if error is caught
  function onDelete() {
    transition(DELETING, true);
    props
      .onDelete(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }

  //return an Appointment component with all the conditionally rendered modes and corresponding components for each mode
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form name="" interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back} />}
      {mode === CONFIRM && (
        <Confirm message="Would you like to delete?" onCancel={back} onConfirm={onDelete} />
      )}
    </article>
  );
}
