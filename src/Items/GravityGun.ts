import { MCFunction, NBT, give } from "sandstone";
import { self } from "../Tick";
import { i } from "../Utils/Functions";

/**
 * A standalone function to give a gravity gun to the current executing player
 */
export const giveGun = MCFunction("items/gravity_gun/give", () => {
  // Give TNT gravity gun
  give(
    self,
    i("minecraft:warped_fungus_on_a_stick", {
      CustomModelData: 111101,
      gravity_guns: "gravity_gun",
      gravity_power: 1,
      tnt_gravity_gun: NBT.byte(1),
      display: { Name: '{"text":"TNT Gravity Gun","italic":false}' },
    }),
    1
  );

  // Give mob gravity gun
  give(
    self,
    i("minecraft:warped_fungus_on_a_stick", {
      CustomModelData: 111101,
      gravity_guns: "gravity_gun",
      gravity_power: 1,
      mob_gravity_gun: NBT.byte(1),
      display: { Name: '{"text":"Mob Gravity Gun","italic":false}' },
    }),
    1
  );
});

// ! Changed the implementation of gravity gun: The gravity looks for a specific tag to execute.
// ! To revert that remove the tag here and in the item trigger function of gravity gun
