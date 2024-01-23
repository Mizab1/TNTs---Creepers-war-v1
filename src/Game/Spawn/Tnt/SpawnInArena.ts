import { MCFunction, Objective, abs, execute, raw, say } from "sandstone";
import { isStarted } from "../../Tick";

const tntSpawnPrivate = Objective.create("tnt_spn_pvt", "dummy");
const randTntScore = tntSpawnPrivate("rand_tnt_scr");
const randLocationScore = tntSpawnPrivate("rand_loc_scr");

const listOfCreepersFunction = [
  "spawn_instant_creeper",
  "spawn_recursive_creeper",
  "spawn_fire_creeper",
  "spawn_stone_creeper",
  "spawn_surprise_creeper",
  "spawn_water_creeper",
];

const listOfLocations = [
  abs(7, 38, 22),
  abs(7, 38, -8),
  abs(-39, 40, 27),
  abs(-39, 40, -13),
  abs(53, 40, -13),
  abs(53, 40, 27),
];

const spawnClock = MCFunction(
  "game/spawn/tnt/spawn_clock",
  () => {
    // Check if the game is started or not
    execute.if(isStarted.matches(1)).run(() => {
      // For generating a random score from the Locations list
      execute.store.result.score(randLocationScore).run(() => {
        raw(`random value 0..${listOfLocations.length - 1}`);
      });
      // For generating a random score from the Creepers list
      execute.store.result.score(randTntScore).run(() => {
        raw(`random value 0..${listOfCreepersFunction.length - 1}`);
      });

      // Loop through the creeper function and locations to spawn a random creeper at random loc
      listOfCreepersFunction.forEach((tnt, i) => {
        listOfLocations.forEach((location, j) => {
          execute.if(randTntScore.matches(i)).run(() => {
            execute.if(randLocationScore.matches(j)).run(() => {
              say(tnt + " AT " + location);
            });
          });
        });
      });
    });
  },
  {
    runEach: "5s",
  }
);
