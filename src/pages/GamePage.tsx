import { useEffect, useState } from "react";

type Props = { playerName: string; selectedTeam: string };

function GamePage({ playerName, selectedTeam }: Props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!playerName || !selectedTeam) return;

    const ws = new WebSocket("ws://localhost:3002");

    ws.onopen = () => {
      console.log("Kapcsolódva a WebSocket szerverhez");

      ws.send(
        JSON.stringify({
          type: "join",
          playerName,
          team: selectedTeam,
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Üzenet a szervertől:", data);
      } catch (error) {
        console.log("Nem JSON üzenet:", event.data);
      }
    };

    ws.onclose = () => {
      console.log("Kapcsolat bontva a WebSocket szerverrel");
    };

    return () => {
      ws.close();
    };
  }, [playerName, selectedTeam]);

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
