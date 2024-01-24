import {
  MCFunction,
  Objective,
  bossbar,
  effect,
  execute,
  tellraw,
} from "sandstone";
import { countingTimer, settingTimer } from "./Timer/Tick";

const GamePrivate = Objective.create("game_pvt", "dummy");
export const isStarted = GamePrivate("is_started");
export const bossbarTimerName: string = "bossbar_timer";

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

  // Transfer the settingTimer to counterTimer
  countingTimer.set(settingTimer);

  // Display the bossbar and set the max
  bossbar.add(bossbarTimerName, { text: "Timer" });
  // @ts-ignore
  bossbar.set(bossbarTimerName).visible(true);
  bossbar.set(bossbarTimerName).players("@a");
  bossbar.set(bossbarTimerName).color("yellow");
  execute.store.result
    .bossbar(bossbarTimerName, "max")
    .run.scoreboard.players.get(
      countingTimer.target,
      countingTimer.objective.name
    );

  tellraw("@a", { text: "Game started", color: "green" });
});

const endGame = MCFunction("game/end_game", () => {
  isStarted.set(0);

  // Remove the bossbar
  bossbar.remove(bossbarTimerName);

  tellraw("@a", { text: "Game ended", color: "red" });
});
