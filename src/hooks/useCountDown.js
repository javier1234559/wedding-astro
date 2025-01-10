
import { useState, useEffect } from 'react';

// LOGIC FOR COUNTDOWN TIMER
// Input date in the format: "YYYY-MM-DDTHH:MM:SSZ"
// Output: {days, hours, minutes, seconds}

const DAYS = 24 * 60 * 60 * 1000;
const HOURS = 60 * 60 * 1000;
const MINUTES = 60 * 1000;
const SECONDS = 1000;

// create a function return a number of second left
export const calculateTimeLeft = (date) => {
  const difference = +new Date(date) - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total : difference
  };

  if (difference !== 0) {
     timeLeft = {
      days: Math.floor(difference / DAYS),
      hours: Math.floor((difference % DAYS) / HOURS),
      minutes: Math.floor((difference % HOURS) / MINUTES),
      seconds: Math.floor((difference % MINUTES) / SECONDS),
      total : difference
    };
  }
  return timeLeft
}

const useCountDown = (date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(date);
      setTimeLeft(timeLeft);

      if (timeLeft.total <= 0) {
        setIsExpired(true);
      }
    }, 1000);

    return () => setInterval(timer);
  }, [date]);

  return { timeLeft, isExpired };
}

export default useCountDown;