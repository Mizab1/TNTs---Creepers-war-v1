import { playsound, rel, setblock, summon, NBT, MCFunction } from "sandstone";

/**
 * A function that spawns a TNT entity with custom properties.
 *
 * @param {string} tag - The tag to assign to the TNT entity.
 * @param {number} customModelData - The custom model data value to assign to the spawned armor stand's endermite spawn egg.
 * @return {() => void} A function that, when called, spawns the TNT entity and an armor stand with custom properties.
 */
export const spawnTNTGeneric = (tag: string, customModelData: number) => {
  const spawningFunction = MCFunction(
    `game/spawn/tnt/tnt_functions/spawn_${tag}`,
    () => {
      playsound("minecraft:block.grass.place", "block", "@a", rel(0, 0, 0));
      setblock(rel(0, 0, 0), "minecraft:tnt");
      summon("minecraft:armor_stand", rel(0, 1, 0), {
        NoGravity: NBT.byte(1),
        Invisible: NBT.byte(1),
        Tags: [`tnt.${tag}`, `tnt.as`],
        ArmorItems: [
          {},
          {},
          {},
          {
            id: "minecraft:endermite_spawn_egg",
            Count: NBT.byte(1),
            tag: { CustomModelData: customModelData },
          },
        ],
        DisabledSlots: 63,
      });
    }
  );
  spawningFunction();
};

/**
 * Spawns a TNT item with the given parameters.
 *
 * @param {string} nameOfTheTnt - The name of the TNT item.
 * @param {string} tag - The tag of the TNT item.
 * @param {number} customModelData - The custom model data of the TNT item.
 */
export const spawnTNTItem = (
  nameOfTheTnt: string,
  tag: string,
  customModelData: number
) => {
  summon("minecraft:item", rel(0, 0, 0), {
    Item: {
      id: "minecraft:endermite_spawn_egg",
      Count: NBT.byte(1),
      tag: {
        display: {
          Name: `{"text":"${nameOfTheTnt}","color":"#FF0808","italic":false}`,
        },
        CustomModelData: customModelData,
        EntityTag: {
          Silent: NBT.byte(1),
          NoAI: NBT.byte(1),
          Tags: [`${tag}`, "tnt.endermite"],
          ActiveEffects: [
            {
              Id: NBT.byte(14),
              Amplifier: NBT.byte(1),
              Duration: 999999,
              ShowParticles: NBT.byte(0),
            },
          ],
        },
      },
    },
  });
};
