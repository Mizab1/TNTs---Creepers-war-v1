import { MCFunction, give } from "sandstone";
import { i } from "../Utils/Functions";
import { self } from "../Tick";

export const giveSpecialBook = MCFunction("items/book/give_special_book", () => {
  give(
    self,
    i("minecraft:written_book", {
      display: { Name: '{"text":"Special TNT book","color":"gold","italic":false}' },
      title: "",
      author: "",
      pages: [
        '[{"text":"Special TNT book:\\n\\n","color":"red","underlined":true},{"text":"Click on the links/items in the book and they will spawn beneath you","color":"black","underlined":false}]',
        '[{"text":"Choose TNT here:\\n\\n","color":"red","underlined":true},{"text":"1. Missile TNT\\n\\n","color":"black","underlined":false,"hoverEvent":{"action":"show_text","value":[{"text":"TNT that spawn missiles that will track the nearest player"}]},"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:give_tnt/give_missile_tnt"}},{"text":"2. Nuclear TNT\\n\\n","color":"black","underlined":false,"hoverEvent":{"action":"show_text","value":[{"text":"TNT with large explosion"}]},"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:give_tnt/give_nuclear"}},{"text":"3. Warden TNT\\n\\n","color":"black","underlined":false,"hoverEvent":{"action":"show_text","value":[{"text":"TNT that will spawn a warden"}]},"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:give_tnt/give_warden"}},{"text":"4. Wither TNT \\n\\n","color":"black","underlined":false,"hoverEvent":{"action":"show_text","value":[{"text":"TNT that will spawn a wither"}]},"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:give_tnt/give_wither_tnt"}},{"text":"5. WWZ TNT","color":"black","underlined":false,"hoverEvent":{"action":"show_text","value":[{"text":"TNT that will spawn many mutant zombie"}]},"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:give_tnt/give_wwz_tnt"}}]',
      ],
    })
  );
});
