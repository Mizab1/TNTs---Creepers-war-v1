import { MCFunction } from "sandstone";
import { spawnTNTItem } from "./Generics";

const spawnRandomTNT = MCFunction("game/spawn/tnt/spawn_random_tnt", () => {
  spawnTNTItem("5x TNT", "5x", 110001);
});
