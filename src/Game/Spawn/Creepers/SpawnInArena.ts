import { MCFunction, Objective, abs, execute, raw } from "sandstone";
import { isStarted } from "../../Tick";

const creeperSpawnPrivate = Objective.create("cpr_spn_pvt", "dummy");
const randCreeperScore = creeperSpawnPrivate("rand_cpr_scr");
const randLocationScore = creeperSpawnPrivate("rand_loc_scr");

const listOfCreepersFunction = [
  "spawn_instant_creeper",
  "spawn_recursive_creeper",
  "spawn_fire_creeper",
  "spawn_stone_creeper",
  "spawn_surprise_creeper",
  "spawn_water_creeper",
];

const listOfLocations = [abs(7, 38, 22), abs(7, 38, -8), abs(-39, 40, 27), abs(-39, 40, -13), abs(53, 40, -13), abs(53, 40, 27)];

const spawnClock = MCFunction(
  "game/spawn/creepers/spawn_clock",
  () => {
    // Check if the game is started or not
    execute.if(isStarted.matches(1)).run(() => {
      // For generating a random score from the Locations list
      execute.store.result.score(randLocationScore).run(() => {
        raw(`random value 0..${listOfLocations.length - 1}`);
      });
      // For generating a random score from the Creepers list
      execute.store.result.score(randCreeperScore).run(() => {
        raw(`random value 0..${listOfCreepersFunction.length - 1}`);
      });

      // Loop through the creeper function and locations to spawn a random creeper at random loc
      listOfCreepersFunction.forEach((creeper, i) => {
        listOfLocations.forEach((location, j) => {
          execute.if(randCreeperScore.matches(i)).run(() => {
            execute.if(randLocationScore.matches(j)).run(() => {
              // say("custom_creeper/spawn/" + creeper + " AT " + location);
              execute.positioned(location).run.functionCmd(`tnts_and_creepers_war:custom_creeper/spawn/${creeper}`);
            });
          });
        });
      });
    });
  },
  {
    runEach: "1s",
  }
);
