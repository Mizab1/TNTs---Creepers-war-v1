import { MCFunction, Objective, effect, tellraw } from "sandstone";

const GamePrivate = Objective.create("game_pvt", "dummy");
export const isStarted = GamePrivate("is_started");

const Tick = MCFunction(
  "game/tick",
  () => {
    // Give night vision to players
    effect.give("@a", "minecraft:night_vision", 10, 1, true);
  },
  { runEachTick: true }
);

// Function to start and end the game
const startGame = MCFunction("game/start_game", () => {
  isStarted.set(1);
  tellraw("@a", { text: "Game started", color: "green" });
});

const endGame = MCFunction("game/end_game", () => {
  isStarted.set(0);
  tellraw("@a", { text: "Game ended", color: "red" });
});
