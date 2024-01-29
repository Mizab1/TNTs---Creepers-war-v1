import {
  MCFunction,
  Objective,
  Selector,
  _,
  abs,
  bossbar,
  clear,
  effect,
  execute,
  gamemode,
  give,
  kill,
  rel,
  schedule,
  spawnpoint,
  teleport,
  tellraw,
  title,
} from "sandstone";
import { giveGun } from "../Items/GravityGun";
import { giveSpecialBook } from "../Items/SpecialBook";
import { self } from "../Tick";
import { initDeathScore, resetDeathScore, setDisplayDeathScore } from "./Scores/DeathScore";
import { joinedTeam, teamBlueMember, teamOrangeMember } from "./Teams/Tick";
import { countingTimer, settingTimer } from "./Timer/Tick";
import { addArmor } from "./Player/Tick";

const GamePrivate = Objective.create("game_pvt", "dummy");
export const isStarted = GamePrivate("is_started");
export const bossbarTimerName: string = "bossbar_timer";

const Tick = MCFunction(
  "game/tick",
  () => {
    // Give night vision to players
    effect.give("@a", "minecraft:night_vision", 20, 1, true);
  },
  { runEachTick: true }
);

/* Sign command for the start sign
give @p warped_sign{display:{Name:'{"text":"start sign"}'},BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true,"italic":false,"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/start_game"}},{"text":"Start","color":"gold"},{"text":" ]","color":"gray","bold":true,"italic":false}]','{"text":""}','{"text":""}']},is_waxed:1b}} 1
*/
// Function to start and end the game
const startGame = MCFunction("game/start_game", () => {
  _.if(_.and(teamOrangeMember, teamBlueMember), () => {
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
      .run.scoreboard.players.get(countingTimer.target, countingTimer.objective.name);

    // Perform operation on the death score
    resetDeathScore();
    initDeathScore();
    setDisplayDeathScore();

    // Teleport the players to their respective spots and set the spawnpoint
    execute.as(teamOrangeMember).run(() => {
      const startingCoords = abs(7, 39, 38);
      teleport(self, startingCoords, abs(180, 0));
      spawnpoint(self, startingCoords);
    });
    execute.as(teamBlueMember).run(() => {
      const startingCoords = abs(7, 39, -24);
      teleport(self, startingCoords, abs(0, 0));
      spawnpoint(self, startingCoords);
    });

    // Give gravity gun to all the players
    execute.as(joinedTeam).run(() => {
      giveGun();
      give(self, "minecraft:cooked_beef", 64);
    });

    execute.as(Selector("@a", { tag: "youtuber" })).run(() => {
      giveSpecialBook();
    });

    // Set gamemode to survival
    execute.as(joinedTeam).run(() => {
      gamemode("survival", self);
    });

    // Play sounds
    execute.as(joinedTeam).at(self).run.playsound("minecraft:block.note_block.chime", "master", self, rel(0, 0, 0), 1, 0.8);

    // Give armor to the player
    execute.as(joinedTeam).run(() => {
      addArmor();
    });

    tellraw("@a", { text: "Game started", color: "green" });
    title(joinedTeam).title({ text: "Fight!", color: "red" });
  }).else(() => {
    tellraw("@a", { text: "One or both teams are empty :(", color: "red" });
  });
});

export const endGame = MCFunction("game/end_game", () => {
  isStarted.set(0);

  countingTimer.set(-1);

  // Kill all the TNTs and creepers
  kill(Selector("@e", { type: "minecraft:creeper", tag: "custom_creeper" }));
  kill(Selector("@e", { type: "minecraft:item", tag: "custom_tnt_item" }));
  kill(Selector("@e", { tag: "tnt.spawned_mobs" }));

  // Clear the inventory of the player and effects
  clear(joinedTeam);
  effect.clear(joinedTeam);

  // Remove the bossbar
  bossbar.remove(bossbarTimerName);

  tellraw("@a", { text: "Game ended", color: "red" });

  // Async function
  schedule.function(
    () => {
      // Teleport player to the hub
      teleport(joinedTeam, abs(7, 54, -30), abs(0, 0));
    },
    "60t",
    "replace"
  );
});

/* command for text display
summon text_display ~ ~ ~ {billboard:"vertical",alignment:"center",Tags:["instructions"],text:'[{"text":"TNT wars\\n","color":"gold","bold":true},{"text":"1. Select a team otherwise the game won\'t start\\n","color":"white","bold":false},{"text":"2. Click \\"Start\\" sign to start the game\\n","color":"white","bold":false},{"text":"3. You will receive 2 gravity guns (one for lifting mob and another for TNT) \\n","color":"white","bold":false},{"text":"4. Kill each other using creepers and TNTs\\n","color":"white","bold":false},{"text":"5. The person with the lowest score wins","color":"white","bold":false}]'}

*/
