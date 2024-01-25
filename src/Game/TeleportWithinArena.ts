import { MCFunction, Selector, rel, spreadplayers } from "sandstone";

// Teleport the living_base within arena, useful for random TNT
export const teleportWithinArena = MCFunction("game/teleport_within_arena", () => {
  spreadplayers(
    rel(0, 0),
    5,
    20,
    60,
    false,
    Selector("@e", {
      type: "#aestd1:living_base",
      sort: "nearest",
      distance: [Infinity, 10], // ! Change the particle radius also
    })
  );
});

// ! Must be changed for each map
