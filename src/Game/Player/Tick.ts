import { MCFunction, item } from "sandstone";
import { self } from "../../Tick";

export const addBlueArmors = MCFunction("game/player/add_blue_armors", () => {
  item.replace
    .entity(self, "armor.chest")
    // @ts-ignore
    .with(`leather_chestplate{display:{Name:'{"text":"Special Suit","italic":false}',color:255}}`, 1);

  item.replace
    .entity(self, "armor.legs")
    // @ts-ignore
    .with(`leather_leggings{display:{Name:'{"text":"Special Suit","italic":false}',color:255}}`, 1);

  item.replace
    .entity(self, "armor.feet")
    // @ts-ignore
    .with(`leather_boots{display:{Name:'{"text":"Special Suit","italic":false}',color:255}}`, 1);
});

export const addOrangeArmors = MCFunction("game/player/add_orange_armors", () => {
  item.replace
    .entity(self, "armor.chest")
    // @ts-ignore
    .with(`leather_chestplate{display:{Name:'{"text":"Special Suit","italic":false}',color:16753920}}`, 1);

  item.replace
    .entity(self, "armor.legs")
    // @ts-ignore
    .with(`leather_leggings{display:{Name:'{"text":"Special Suit","italic":false}',color:16753920}}`, 1);

  item.replace
    .entity(self, "armor.feet")
    // @ts-ignore
    .with(`leather_boots{display:{Name:'{"text":"Special Suit","italic":false}',color:16753920}}`, 1);
});
