import React from 'react';
import classnames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  //initialize classnames of a DayListItem
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  //a function that returns a formatted string for the number of spots remaining
  // 0 : no spots; 1 : 1 spot; > 1 : ${props.spots} spots
  const formatSpots = () => {
    let spotsString = '';
    if (props.spots === 0) spotsString += 'no spots remaining';
    if (props.spots === 1) spotsString += '1 spot remaining';
    if (props.spots > 1) spotsString += `${props.spots} spots remaining`;
    return spotsString;
  };

  //returns the DayListItem component with the class names, parent props, and a formatted spots string
  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
