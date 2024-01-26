import {
  MCFunction,
  NBT,
  Objective,
  Selector,
  abs,
  execute,
  functionCmd,
  kill,
  raw,
  rel,
  say,
  spreadplayers,
  summon,
} from "sandstone";
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
  "minecraft:strong_strength",
  "minecraft:healing",
  "minecraft:fire_resistance",
  "minecraft:swiftness",
];

const listOfLocations = [
  abs(-26, 40, 7),
  abs(40, 40, 7),
  abs(23, 39, 22),
  abs(23, 39, -8),
  abs(-9, 39, -8),
  abs(-9, 39, 22),
  // abs(7, 38, 4),
  // abs(7, 38, 10),
  // abs(29, 40, 7),
  // abs(-16, 40, 7),
];

const spawnClock = MCFunction(
  "game/spawn/tnt/spawn_clock",
  () => {
    // Check if the game is started or not
    execute.if(isStarted.matches(1)).run(() => {
      // For generating a random score from the Locations list
      // execute.store.result.score(randLocationScore).run(() => {
      //   raw(`random value 0..${listOfLocations.length - 1}`);
      // });
      // For generating a random score from the Creepers list
      execute.store.result.score(randTntScore).run(() => {
        raw(`random value 0..${listOfTntFunction.length - 1}`);
      });

      // Loop through the creeper function and locations to spawn a random creeper at random loc
      // listOfLocations.forEach((location, j) => {
      //   execute
      //     .if(randLocationScore.matches(j))
      //     .positioned(location)
      //     .run(() => {
      //       execute.positioned(location).run(() => {
      //         pickRandomTNT();
      //         // say("AT " + location);
      //       });
      //     });
      // });

      // Spreader
      spawnWithSpread();
    });
  },
  {
    runEach: "2s",
  }
);

const spawnWithSpread = MCFunction("game/spawn/tnt/spawn_with_spread", () => {
  const spreaderSelector = Selector("@e", { type: "minecraft:armor_stand", tag: "spread_tnt_spawner" });
  // Spawn the spreader
  for (let i = 0; i < 10; i++) {
    summon("minecraft:armor_stand", abs(7, 38, 7), {
      Marker: NBT.byte(1),
      Invisible: NBT.byte(1),
      Tags: ["spread_tnt_spawner"],
    });
  }

  // Spread the spreader
  spreadplayers(abs(7, 7), 6, 32, 60, false, spreaderSelector);

  // Spawn the TNT
  execute.at(spreaderSelector).run(() => {
    pickRandomTNT();
  });

  // Remove the spreader
  kill(spreaderSelector);
});

// For picking random TNT from the list
const pickRandomTNT = MCFunction("game/spawn/tnt/pick_random_tnt", () => {
  listOfTntFunction.forEach((tnt, i) => {
    execute.if(randTntScore.matches(i)).run(() => {
      if (tnt.includes("give")) {
        functionCmd(`tnts_and_creepers_war:give_tnt/${tnt}`);
      } else {
        // summon item ~ ~ ~ {Item:{id:"minecraft:splash_potion",Count:1b,tag:{Potion:"minecraft:strong_strength"}}}
        summon("minecraft:item", rel(0, 0, 0), {
          Item: { id: "minecraft:splash_potion", Count: NBT.byte(1), tag: { Potion: tnt } },
        });
      }
      // say(tnt + " AT ");
    });
  });
});
