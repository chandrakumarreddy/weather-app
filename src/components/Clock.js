import React from "react";

export default function Clock() {
  const [state, setState] = React.useState(() =>
    new Date().toLocaleTimeString()
  );
  React.useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setState(() => new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      <h1>{state}</h1>
    </div>
  );
}
