import {
  MCFunction,
  NBT,
  Objective,
  ObjectiveInstance,
  Score,
  Selector,
  execute,
  fill,
  particle,
  rel,
  say,
  setblock,
  summon,
  tag,
} from "sandstone";
import { createCustomCreeper } from "./Private/CustomCreeperComponents";

const self = Selector("@s");

/* LOAD */
const creeperFuseObj: ObjectiveInstance<string> = Objective.create(
  "creeper_fuse_obj",
  "dummy"
);
const creeperFuse: Score<string> = creeperFuseObj("@s");

/* TICK */
MCFunction(
  "custom_creeper/tick",
  () => {
    execute
      .as(Selector("@e", { type: "minecraft:creeper", tag: "dynamic_creeper" }))
      .at(self)
      .run(() => {
        /* CREEPER FUSE HANDLER */
        // Decrease the timer of the fuse from the individual scoreboard
        execute.if(creeperFuse.greaterThan(0)).run(() => {
          creeperFuse.remove(1);
        });

        // Detecting if the creeper is ignited and storing its Fuse in a scoreboard
        execute.if
          .entity(
            Selector("@s", { tag: ["!ignited"], nbt: { ignited: NBT.byte(1) } })
          )
          .run(() => {
            tag(self).add("ignited");
            execute.store.result
              .score(self, "creeper_fuse_obj")
              .run.data.get.entity(self, "Fuse");
          });
        /* END */

        // Run the creeper handler every tick and create a creeper file once
        //! This function will create a file regardless of the condition status, but it will run the handler function on only "dynamic" creeper

        /* Start creating custom creeper from here */
        createCustomCreeper(
          "Instant Creeper",
          "instant_creeper",
          rel(0, 0, 0),
          3,
          1,
          1,
          null
        );
        createCustomCreeper(
          "Recursive Creeper",
          "recursive_creeper",
          rel(0, 0, 0),
          3,
          30,
          1,
          () => {
            particle(
              "minecraft:poof",
              rel(0, 0, 0),
              [1, 1, 1],
              0.2,
              100,
              "force"
            );
            for (let i = 0; i < 6; i++) {
              summon("minecraft:creeper", rel(Math.sin(i), 1.5, Math.cos(i)), {
                active_effects: [
                  {
                    id: "minecraft:resistance",
                    amplifier: NBT.byte(64),
                    duration: 50,
                    show_particles: NBT.byte(0),
                  },
                ],
                DeathLootTable: "minecraft:bat",
              });
            }
          }
        );
        createCustomCreeper(
          "Water Creeper",
          "water_creeper",
          rel(0, 0, 0),
          2,
          30,
          1,
          () => {
            particle(
              "minecraft:splash",
              rel(0, 0, 0),
              [1, 1, 1],
              0,
              400,
              "force"
            );
            for (let i = 2; i >= -2; i--) {
              for (let j = 2; j >= -2; j--) {
                for (let k = -1; k >= -2; k--) {
                  execute
                    .positioned(rel(i, k, j))
                    .unless.block(rel(0, 0, 0), "minecraft:obsidian")
                    .run(() => {
                      setblock(rel(0, 0, 0), "minecraft:water", "replace");
                    });
                }
              }
            }
          }
        );
        createCustomCreeper(
          "Fire Creeper",
          "fire_creeper",
          rel(0, 0, 0),
          2,
          30,
          1,
          () => {
            particle(
              "minecraft:flame",
              rel(0, 1, 0),
              [0.5, 0.5, 0.5],
              0.2,
              400,
              "force"
            );
            fill(
              rel(5, 2, 5),
              rel(-5, -3, -5),
              "minecraft:fire replace #aestd1:air"
            );
          }
        );
      });
  },
  {
    runEachTick: true,
  }
);
