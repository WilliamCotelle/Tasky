import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const ProductivityTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(1500); // Durée totale en secondes (25 minutes par défaut)

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / duration) * circumference;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds < duration) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (seconds >= duration) {
      setIsActive(false); // Stop timer when duration is reached
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds, duration]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center space-y-4 w-48">
      {/* Timer circulaire */}
      <div className="relative flex items-center justify-center">
        <svg width="120" height="120" className="transform -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="absolute text-2xl font-mono text-gray-900">
          {formatTime(duration - seconds)}
        </span>
      </div>

      {/* Boutons de contrôle du timer */}
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full bg-gray-400 hover:bg-gray-500 text-white transition"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductivityTimer;
