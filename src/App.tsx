import { useState } from "react";
import "./App.css";
import GamePage from "./pages/GamePage";
import { Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </>
    </>
  );
}

export default App;
