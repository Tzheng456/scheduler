import React from 'react';
import classnames from 'classnames';

import 'components/Button.scss';

export default function Button(props) {
  //initialize classnames for Button component
  const buttonClass = classnames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger,
  });

  //returns a Button component with the classnames and props from parent as properties
  return (
    <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
