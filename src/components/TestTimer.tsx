
import React, { useState, useEffect, useCallback } from 'react';
import { Timer } from 'lucide-react';

interface TestTimerProps {
  duration: number; // duration in minutes
  onTimeUp: () => void;
}

const TestTimer: React.FC<TestTimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timerColor = timeLeft < 300 ? 'text-red-500' : 'text-gray-700';

  return (
    <div className={`flex items-center gap-2 text-lg font-semibold ${timerColor}`}>
      <Timer className="h-5 w-5" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default TestTimer;
