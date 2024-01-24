import { MCFunction, Objective, abs, execute, functionCmd, raw, say } from "sandstone";
import { isStarted } from "../../Tick";

const tntSpawnPrivate = Objective.create("tnt_spn_pvt", "dummy");
const randTntScore = tntSpawnPrivate("rand_tnt_scr");
const randLocationScore = tntSpawnPrivate("rand_loc_scr");

const listOfTntFunction = [
  "give_arrow",
  "give_bees",
  "give_creeper",
  "give_ender",
  "give_ghost",
  "give_honey",
  "give_levitation_tnt",
  "give_lightning",
  "give_meteorite",
  "give_mobs",
  "give_nausea_tnt",
  "give_normal_tnt",
  // "give_missile_tnt",
  // "give_nuclear",
  // "give_warden",
  // "give_wither_tnt",
  // "give_wwz_tnt",
];

const listOfLocations = [abs(-26, 40, 7), abs(40, 40, 7), abs(23, 39, 22), abs(23, 39, -8), abs(-9, 39, -8), abs(-9, 39, 22)];

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
        raw(`random value 0..${listOfTntFunction.length - 1}`);
      });

      // Loop through the creeper function and locations to spawn a random creeper at random loc
      listOfTntFunction.forEach((tnt, i) => {
        listOfLocations.forEach((location, j) => {
          execute.if(randTntScore.matches(i)).run(() => {
            execute.if(randLocationScore.matches(j)).run(() => {
              execute.positioned(location).run.functionCmd(`tnts_and_creepers_war:give_tnt/${tnt}`);
              // say(tnt + " AT " + location);
            });
          });
        });
      });
    });
  },
  {
    runEach: "3s",
  }
);
