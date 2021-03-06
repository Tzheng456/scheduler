import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';

function InterviewerList(props) {
  const interviewersMapped = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.value}
      onChange={() => props.onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersMapped}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
