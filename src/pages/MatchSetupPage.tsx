import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  playerName: string;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
};

function MatchSetupPage({ playerName, selectedTeam, setSelectedTeam }: Props) {
  const navigate = useNavigate();

  const handleLeave = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleStartGame = () => {
    if (!selectedTeam) {
      alert("Kérem, válassza ki a csapatot a játék indításához!");
      return;
    }

    console.log("Játék betöltése!");
    navigate("/game");
  };

  return (
    <div id="match-container">
      <div id="welcome-text">Üdvözöljük a játékban!</div>
      <div id="match-title">⏳ Várakozás a csatlakozásra...</div>
      <div id="instruction-text">
        Válassza ki a csapatot a játék indításához!
      </div>

      <div className="teams-container">
        <div
          className={
            selectedTeam === "A"
              ? "team-card team-a selected"
              : "team-card team-a"
          }
        >
          <h2>A csapat</h2>
          <hr style={{ height: "5px", backgroundColor: "white" }} />
          <div
            className="player-slot selectable-slot"
            onClick={() => setSelectedTeam("A")}
          >
            {selectedTeam === "A" ? playerName : "Üres"}
          </div>
        </div>

        <div
          className={
            selectedTeam === "B"
              ? "team-card team-b selected"
              : "team-card team-b"
          }
        >
          <h2>B csapat</h2>
          <hr style={{ height: "5px", backgroundColor: "white" }} />
          <div
            className="player-slot selectable-slot"
            onClick={() => setSelectedTeam("B")}
          >
            {selectedTeam === "B" ? playerName : "Üres"}
          </div>
        </div>
      </div>

      <div id="button-container">
        <button className="start-btn" onClick={handleStartGame}>
          Játék indítása
        </button>
        <button className="exit-btn" onClick={handleLeave}>
          Kilépés
        </button>
      </div>
    </div>
  );
}

export default MatchSetupPage;
