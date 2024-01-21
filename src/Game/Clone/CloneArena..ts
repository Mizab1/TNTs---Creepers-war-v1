import { MCFunction, abs, clone } from "sandstone";

const cloneArena = MCFunction("game/clone/clone_arena", () => {
  for (let i = -1; i <= 26; i++) {
    clone(abs(-54, i, -29), abs(68, i, 43), abs(-54, i + 36, -29));
  }
});
