import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDate = () => {
  const d = new Date();
  return `${days[d.getDay()]} ${d.getDate()}, ${
    months[d.getMonth()]
  } ${d.getFullYear()}`;
};

export default function DateTime() {
  return (
    <div>
      <h3>{getDate()}</h3>
    </div>
  );
}
