import { useEffect, useState } from "react";
import './Quiz.css';

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // Timeout to call onTimeout after the specified timeout period
    const timerId = setTimeout(() => {
      onTimeout();
      setRemainingTime(0); // Set remaining time to 0 when timeout occurs
    }, timeout);

    return () => clearTimeout(timerId);
  }, [timeout, onTimeout]);

  useEffect(() => {
    // Interval to update the remaining time every 100 milliseconds
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        const newRemainingTime = prevRemainingTime - 100;
        return newRemainingTime > 0 ? newRemainingTime : 0;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return <progress id="question_time" max={timeout} value={remainingTime} />;
}
