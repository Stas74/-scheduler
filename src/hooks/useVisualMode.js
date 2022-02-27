import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // console.log("mode", mode)
  // console.log("initial", initial)

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      history[history.length - 1] = mode;
    } else {
      history.push(mode);
    }
    setHistory([...history]);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
    }
    setHistory([...history]);
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back, history };
}

// function useControlledInput(initial) {
//   const [value, setValue] = useState(initial);

//   return {
//     value,
//     onChange: (event) => setValue(event.target.value)
//   };
// }

// function Application(props) {
//   const firstname = useControlledInput("");
//   const lastname = useControlledInput("");
//   const email = useControlledInput("");
//   const password = useControlledInput("");
//   const passwordConfirmation = useControlledInput("");

//   return (
//     <form>
//       <input {...firstname} />
//       <input {...lastname} />
//       <input {...email} />
//       <input {...password} type="password" />
//       <input {...passwordConfirmation} type="password" />
//     </form>
//   );
// }
