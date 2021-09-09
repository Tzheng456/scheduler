import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  //function takes the array of days passed in from props
  //maps each day's properties to be a DayListItem component
  const daysMapped = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={() => props.setDay(day.name)}
    />
  ));
  //returns the list of DayListItems with data entered into them appended to an unordered list comp
  return <ul>{daysMapped}</ul>;
}
