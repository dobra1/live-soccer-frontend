import React, { use, useState } from "react";
import { useEffect } from "react";

type Props = { playerName: string; selectedTeam: string };

function GamePage({ selectedTeam }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t: number) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div id="game-container">
      <div id="scoreboard">
        <div className="teamA">A csapat</div>
        <div className="score">
          <span>{formatTime(time)}</span>
        </div>

        <div className="teamB">B csapat</div>
      </div>

      <div id="field">
        <div className="mid-line"></div>
        <div className="center-circle"></div>

        <div className="goal left-goal"></div>
        <div className="goal right-goal"></div>

        <div className={selectedTeam === "A" ? "player-a" : "player-b"}></div>
      </div>
    </div>
  );
}

export default GamePage;
