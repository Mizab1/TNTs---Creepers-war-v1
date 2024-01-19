import { MCFunction, Objective } from "sandstone";

// ! Will automatically increment as the player dies
const deathScoreObj = Objective.create("death_score_obj", "deathCount", {
  text: "Death Score",
  color: "red",
});
const deathScore = deathScoreObj("@s");

// ! Must be used by executing AS the player
const incrementDeathScore = MCFunction(
  "game/scores/increment_death_score",
  () => {
    deathScore.add(1);
  }
);
const decrementDeathScore = MCFunction(
  "game/scores/decrement_death_score",
  () => {
    deathScore.remove(1);
  }
);
