import { useEffect, useState } from "react";

export default function Time({ timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: true,
    timeZone: timezone,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: timezone,
  });

  return (
    <>
      <h1>{formattedTime}</h1>
      <p>{formattedDate}</p>
      <small>{timezone}</small>
    </>
  );
}
