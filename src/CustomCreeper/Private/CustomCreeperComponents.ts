import { Coordinates, MCFunction, NBT, Selector, execute, summon } from "sandstone";
import { self } from "../../Tick";

/**
 * Generates a custom creeper spawn file for the given name, tag, coordinates, explosion radius, initial fuse, and dynamic flag.
 *
 * @param {string} name - The name of the custom creeper.
 * @param {string} tag - The tag of the custom creeper.
 * @param {Coordinates} coords - The coordinates where the creeper will be spawned.
 * @param {number} explosionRadius - The explosion radius of the creeper or how much power will it contain. Default is 3.
 * @param {number} initialFuse - The initial fuse of the creeper. Default is 30.
 * @param {boolean} isDynamic - A flag indicating whether the creeper is dynamic or static. Default is false.
 */
const SpawnFileForCustomCreeper = (
  name: string,
  tag: string,
  coords: Coordinates,
  explosionRadius: number = 3,
  initialFuse: number = 30,
  isDynamic: boolean = false
) => {
  MCFunction(`custom_creeper/spawn/spawn_${name.replace(" ", "_").toLocaleLowerCase()}`, () => {
    summon("minecraft:creeper", coords, {
      CustomName: `{"text": "${name}"}`,
      Tags: ["custom_creeper", tag, isDynamic ? "dynamic_creeper" : "static_creeper"],
      ExplosionRadius: NBT.byte(explosionRadius),
      Fuse: initialFuse,
      DeathLootTable: "minecraft:bat",
    });
  });
};

/**
 * Creates a custom creeper entity with the specified name, tag, coordinates, explosion radius, initial fuse, final fuse, creeper handler function, and creeper run each tick function.
 *
 * @param {string} name - the name of the custom creeper
 * @param {string} tag - the tag of the custom creeper
 * @param {Coordinates} coords - the coordinates of the custom creeper
 * @param {number} [explosionRadius=3] - the explosion radius of the custom creeper
 * @param {number} [initialFuse=30] - the initial fuse of the custom creeper
 * @param {number} [finalFuse=1] - the final fuse of the custom creeper
 * @param {{ (): void } | null} creeperHandlerFunction - the function to handle the custom creeper
 * @param {{ (): void } | null} creeperRunEachTickFunction - the function to run each tick for the custom creeper
 */
export const createCustomCreeper = (
  name: string,
  tag: string,
  coords: Coordinates,
  explosionRadius: number = 3,
  initialFuse: number = 30,
  finalFuse: number = 1,
  creeperHandlerFunction: { (): void } | null,
  creeperRunEachTickFunction: { (): void } | null
) => {
  // Call the spawnFileFunction
  SpawnFileForCustomCreeper(name, tag, coords, explosionRadius, initialFuse, creeperHandlerFunction ? true : false);

  // Call the function if it is available
  if (creeperHandlerFunction) {
    // Execute the function of the behalf og this entity
    execute
      .as(
        Selector("@s", {
          tag: [tag],
        })
      )
      .at(self)
      .run(() => {
        if (creeperRunEachTickFunction) {
          creeperRunEachTickFunction();
        }
        execute.if
          .entity(
            Selector("@s", {
              scores: { creeper_fuse_obj: [Infinity, finalFuse] },
            })
          )
          .run(() => {
            creeperHandlerFunction();
          });
      });
  }
};
