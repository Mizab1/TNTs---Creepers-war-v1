import { MCFunction, item } from "sandstone";
import { self } from "../../Tick";

export const addArmor = MCFunction("game/player/add_armor", () => {
  item.replace.entity(self, "armor.head").with("minecraft:iron_helmet", 1);
  item.replace.entity(self, "armor.chest").with("minecraft:iron_chestplate", 1);
  item.replace.entity(self, "armor.legs").with("minecraft:iron_leggings", 1);
  item.replace.entity(self, "armor.feet").with("minecraft:iron_boots", 1);
});
