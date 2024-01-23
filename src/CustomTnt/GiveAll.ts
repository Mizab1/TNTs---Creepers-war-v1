import { MCFunction, MCFunctionInstance, raw } from "sandstone";

const GiveAll: MCFunctionInstance = MCFunction("custom_tnt/give_all", () => {
  const listOfTntFunction = [
    "give_arrow",
    "give_bees",
    "give_creeper",
    "give_ender",
    "give_ghost",
    "give_honey",
    "give_levitation_tnt",
    "give_lightning",
    "give_meteorite",
    "give_mobs",
    "give_nausea_tnt",
    "give_normal_tnt",
    "give_missile_tnt",
    "give_nuclear",
    "give_warden",
    "give_wither_tnt",
    "give_wwz_tnt",
  ];

  listOfTntFunction.forEach((tnt) => {
    raw(`function tnts_and_creepers_war:give_tnt/${tnt}`);
  });
});
