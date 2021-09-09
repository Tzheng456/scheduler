import React from 'react';
import classnames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = () => {
    let spotsString = '';
    if (props.spots === 0) spotsString += 'no spots remaining';
    if (props.spots === 1) spotsString += '1 spot remaining';
    if (props.spots > 1) spotsString += `${props.spots} spots remaining`;
    return spotsString;
  };

  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
