import { MCFunction, Objective, tellraw } from "sandstone";

const GamePrivate = Objective.create("game_pvt", "dummy");
export const isStarted = GamePrivate("is_started");

// Function to start and end the game
const startGame = MCFunction("game/start_game", () => {
  isStarted.set(1);
  tellraw("@a", { text: "Game started", color: "green" });
});

const endGame = MCFunction("game/end_game", () => {
  isStarted.set(0);
  tellraw("@a", { text: "Game ended", color: "red" });
});
