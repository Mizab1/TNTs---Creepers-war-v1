import { MCFunction, Objective, Selector, _, execute, scoreboard } from "sandstone";
import { joinedTeam } from "../Teams/Tick";

// ! Will automatically increment as the player dies
export const deathScoreObj = Objective.create("death_score_obj", "deathCount", {
  text: "Death Score",
  color: "red",
});
const deathPrivateObj = Objective.create("death_pvt", "dummy");

export const deathScore = deathScoreObj("@s");
// const deathScoreOrange = deathScoreObj(Selector("@a", { tag: "orange" }));
// const deathScoreBlue = deathScoreObj(Selector("@a", { tag: "blue" }));
export const minDeathScore = deathPrivateObj("min_death");

// ! Must be used by executing AS the player
const incrementDeathScore = MCFunction("game/scores/increment_death_score", () => {
  deathScore.add(1);
});
const decrementDeathScore = MCFunction("game/scores/decrement_death_score", () => {
  deathScore.remove(1);
});

export const resetDeathScore = MCFunction("game/scores/reset_death", () => {
  execute.as("@a").run(() => {
    deathScore.reset();
  });
});

export const initDeathScore = MCFunction("game/scores/init_death_score", () => {
  execute.as(joinedTeam).run(() => {
    deathScore.set(0);
  });
});

export const setDisplayDeathScore = MCFunction("game/scores/set_display", () => {
  scoreboard.objectives.setDisplay("sidebar", deathScoreObj.name);
});

export const clearDisplayDeathScore = MCFunction("game/scores/clear_display", () => {
  scoreboard.objectives.setDisplay("sidebar");
});

export const findMinDeathScore = MCFunction("game/scores/find_min_death_score", () => {
  minDeathScore.set(99999);

  scoreboard.players.operation(minDeathScore.target, minDeathScore.objective.name, "<", joinedTeam, deathScore.objective.name);
});
