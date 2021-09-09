import React from 'react';
import classnames from 'classnames';

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  //initialize class names of an InterviewListItem
  const interviewerClass = classnames('interviewers', {
    'interviewers__item--selected': props.selected,
  });

  //returns an InterviewListItem with class names and parent props added as properties
  return (
    <li className={interviewerClass} onClick={props.onChange}>
      <img className="interviewers__item-image" src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
}
