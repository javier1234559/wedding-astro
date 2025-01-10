import useCountDown from "@/hooks/useCountDown";

function CountDownTimer({ date }) {
  const { timeLeft, isExpired } = useCountDown(date);

  return (
    <div className="flex space-x-4 text-center">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.days}</span>
        <span className="text-sm">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.hours}</span>
        <span className="text-sm">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.minutes}</span>
        <span className="text-sm">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">{timeLeft.seconds}</span>
        <span className="text-sm">Seconds</span>
      </div>
    </div>
  );
}

CountDownTimer.displayName = "CountDownTimer";
export default CountDownTimer;
