import { useState } from 'react';
export default function useVisualMode(initial) {
  //history state
  const [history, setHistory] = useState([initial]);

  //function which transitions to mode, and replaces the last mode in history if replace is true
  function transition(mode, replace = false) {
    //add the passed in mode to history
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    } else {
      //replace the last mode in history with new passed in mode
      setHistory((prev) => {
        const prevReplace = [...prev].slice(0, -1);
        return [...prevReplace, mode];
      });
    }
  }

  //function which goes back to the last mode if history is at least length 1
  //removes the last mode in history
  function back() {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => prev.slice(0, -1));
  }

  //sets the new mode by taking the last mode in history state
  const mode = history[history.length - 1];

  return { mode, transition, back };
}
