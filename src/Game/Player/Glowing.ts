import { MCFunction, _, effect, tellraw } from "sandstone";
import { joinedTeam } from "../Teams/Tick";
import { countingTimer } from "../Timer/Tick";

const giveGlow = MCFunction("game/player/give_glow", () => {
  effect.give(joinedTeam, "minecraft:glowing", 5, 0, true);
  tellraw("@a", { text: "Players are glowing!", color: "red" });
});

const glowCounter = MCFunction("game/player/glow_counter", () => {
  _.if(countingTimer.moduloBy(30).equalTo(0), () => {
    giveGlow();
  });
});
