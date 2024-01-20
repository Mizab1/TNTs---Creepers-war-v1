import { MCFunction, Selector, effect, execute } from "sandstone";
import { self } from "../../../Tick";

export const AddNausea = MCFunction(
  "custom_tnt/auxillary/nausea_tnt/add_nausea",
  () => {
    // Give darkness to the nearby player
    execute
      .as(
        Selector("@e", {
          type: "minecraft:block_display",
          tag: "nausea_block_display",
        })
      )
      .at(self)
      .run(() => {
        effect.give(
          Selector("@a", { distance: [Infinity, 5] }),
          "minecraft:nausea",
          10,
          8,
          true
        );
      });
  }
);
