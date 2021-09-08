import { useState } from 'react';
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (!replace) {
      setMode(() => mode);
      setHistory((prev) => [...prev, mode]);
    } else {
      setMode(() => mode);
      setHistory((prev) => {
        const prevReplace = [...prev].slice(0, -1);
        return [...prevReplace, mode];
      });
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(() => history[history.length - 2]);
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  return { mode, transition, back };
}
