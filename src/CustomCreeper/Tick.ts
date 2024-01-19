import {
  MCFunction,
  NBT,
  Objective,
  ObjectiveInstance,
  Score,
  Selector,
  execute,
  rel,
  say,
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
          5,
          20,
          1,
          () => {
            say("Hello");
          }
        );
      });
  },
  {
    runEachTick: true,
  }
);
