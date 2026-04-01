import { useState } from "react";
import GameIntro from "../components/game/GameIntro";
import GamePlay from "../components/game/GamePlay";
import GameResults from "../components/game/GameResults";

export default function Game() {
  const [phase, setPhase] = useState("intro"); // intro | play | results
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStart = () => setPhase("play");

  const handleFinish = (finalScore, allAnswers) => {
    setScore(finalScore);
    setAnswers(allAnswers);
    setPhase("results");
  };

  const handleRestart = () => {
    setScore(0);
    setAnswers([]);
    setPhase("intro");
  };

  return (
    <div className="min-h-screen bg-background">
      {phase === "intro" && <GameIntro onStart={handleStart} />}
      {phase === "play" && <GamePlay onFinish={handleFinish} />}
      {phase === "results" && (
        <GameResults score={score} answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}