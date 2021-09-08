import { useState } from 'react';
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    } else {
      setHistory((prev) => {
        const prevReplace = [...prev].slice(0, -1);
        return [...prevReplace, mode];
      });
    }
  }
  function back() {
    if (history.length < 2) {
      return;
    }

    setHistory((prev) => prev.slice(0, -1));
  }

  const mode = history[history.length - 1];

  return { mode, transition, back };
}
