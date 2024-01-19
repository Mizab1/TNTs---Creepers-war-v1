import {
  Coordinates,
  MCFunction,
  NBT,
  Selector,
  execute,
  summon,
} from "sandstone";
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
  MCFunction(
    `custom_creeper/spawn/spawn_${name.replace(" ", "_").toLocaleLowerCase()}`,
    () => {
      summon("minecraft:creeper", coords, {
        CustomName: `{"text": "${name}"}`,
        Tags: [
          "custom_creeper",
          tag,
          isDynamic ? "dynamic_creeper" : "static_creeper",
        ],
        ExplosionRadius: NBT.byte(explosionRadius),
        Fuse: initialFuse,
      });
    }
  );
};

/**
 * Creates a custom creeper entity with the specified name, tag, coordinates, explosion radius, initial fuse, and final fuse.
 * If a creeper handler function is provided, it will be called when the creeper entity is executed.
 *
 * @param {string} name - The name of the custom creeper entity.
 * @param {string} tag - The tag of the custom creeper entity.
 * @param {Coordinates} coords - The coordinates of the custom creeper entity.
 * @param {number} [explosionRadius=3] - The explosion radius of the custom creeper entity.
 * @param {number} [initialFuse=30] - The initial fuse of the custom creeper entity.
 * @param {number} [finalFuse=1] - The final fuse which will decide when will it explodes.
 * @param {() => void | null} creeperHandlerFunction - The function to be handles the exploding mechanics of the creeper.
 */
export const createCustomCreeper = (
  name: string,
  tag: string,
  coords: Coordinates,
  explosionRadius: number = 3,
  initialFuse: number = 30,
  finalFuse: number = 1,
  creeperHandlerFunction: () => void | null
) => {
  // Call the spawnFileFunction
  SpawnFileForCustomCreeper(
    name,
    tag,
    coords,
    explosionRadius,
    initialFuse,
    creeperHandlerFunction ? true : false
  );

  // Call the function if it is available
  if (creeperHandlerFunction) {
    // Execute the function of the behalf og this entity
    execute
      .as(
        Selector("@s", {
          tag: [tag],
          scores: { creeper_fuse_obj: [Infinity, finalFuse] },
        })
      )
      .at(self)
      .run(() => {
        creeperHandlerFunction();
      });
  }
};
