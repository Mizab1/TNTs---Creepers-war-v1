import { MCFunction, item } from "sandstone";
import { self } from "../../Tick";
import { i } from "../../Utils/Functions";

export const addArmor = MCFunction("game/player/add_armor", () => {
  // @ts-ignore
  // item.replace.entity(self, "armor.head").with(i("minecraft:iron_helmet", { display: { Name: '{"text":"Special Armor"}' } }), 1);

  item.replace
    .entity(self, "armor.chest")
    // @ts-ignore
    .with(i("minecraft:iron_chestplate", { display: { Name: '{"text":"Special Armor"}' } }), 1);

  item.replace
    .entity(self, "armor.legs")
    // @ts-ignore
    .with(i("minecraft:iron_leggings", { display: { Name: '{"text":"Special Armor"}' } }), 1);

  // @ts-ignore
  item.replace.entity(self, "armor.feet").with(i("minecraft:iron_boots", { display: { Name: '{"text":"Special Armor"}' } }), 1);
});
