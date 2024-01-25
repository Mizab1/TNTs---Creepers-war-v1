import * as lodash from "lodash";
import {
  MCFunction,
  NBT,
  Selector,
  Variable,
  _,
  effect,
  execute,
  functionCmd,
  gamerule,
  kill,
  particle,
  playsound,
  raw,
  rel,
  schedule,
  spreadplayers,
  summon,
} from "sandstone";
import { self } from "../Tick";
import { randomIntFromInterval } from "../Utils/Functions";
import { explosionHandler, placeAndCreateFunction } from "./private/SetupGenerics";
import { teleportWithinArena } from "../Game/TeleportWithinArena";

export const setTntblock = MCFunction("custom_tnt/setblock", () => {
  execute
    .as(Selector("@e", { type: "minecraft:endermite", tag: "tnt.endermite" }))
    .at(self)
    .run(() => {
      // Creates the "Give TNT" function and does the processing if Custom TNT is placed
      // New TNT
      placeAndCreateFunction("give_mobs", "Mobs TNT", "animals", 110005);
      placeAndCreateFunction("give_lightning", "Lightning Strike TNT", "lightning", 110006);
      placeAndCreateFunction("give_nuclear", "Nuclear TNT", "nuclear", 110008);
      placeAndCreateFunction("give_warden", "Warden TNT", "warden", 110009);
      placeAndCreateFunction("give_bees", "Angry Bees TNT", "bees", 110017);
      placeAndCreateFunction("give_honey", "Honey TNT", "honey", 110018);
      placeAndCreateFunction("give_creeper", "Creeper TNT", "creeper", 110019);
      placeAndCreateFunction("give_meteorite", "Meteorite TNT", "meteor", 120001);
      placeAndCreateFunction("give_arrow", "Arrow TNT", "arrow", 120005);
      placeAndCreateFunction("give_ghost", "Ghost TNT", "ghost", 120008);
      placeAndCreateFunction("give_ender", "Ender TNT", "ender", 120009);
      placeAndCreateFunction("give_normal_tnt", "Normal TNT", "normal", 130001);
      placeAndCreateFunction("give_nausea_tnt", "Nausea TNT", "nausea", 130002);
      placeAndCreateFunction("give_levitation_tnt", "Levitation TNT", "levitation", 130003);
      placeAndCreateFunction("give_wither_tnt", "Wither TNT", "wither", 130004);
      placeAndCreateFunction("give_wwz_tnt", "World War Z TNT", "wwz", 130005);
      placeAndCreateFunction("give_missile_tnt", "Missile TNT", "missile", 130006);
    });
});

export const handler = MCFunction("custom_tnt/handler", () => {
  execute
    .as(Selector("@e", { type: "minecraft:armor_stand", tag: "tnt.as" }))
    .at(self)
    .run(() => {
      // Cycle through all the available TNT and pick the correct handler
      // New TNTs
      explosionHandler(
        "tnt.animals",
        100,
        () => {
          particle("minecraft:cloud", rel(0, 1, 0), [0.1, 0.5, 0.1], 0.1, 1, "force");
        },
        () => {
          for (let i = 0; i < 2; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Tags: ["tnt.creeper"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              ExplosionRadius: NBT.byte(2),
            });
            summon("minecraft:skeleton", rel(0, 0, 0), {
              Tags: ["tnt.skeleton"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:blaze", rel(0, 0, 0), {
              Tags: ["tnt.blaze"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
            });
            summon("minecraft:enderman", rel(0, 0, 0), {
              Tags: ["tnt.enderman"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
            });
            summon("minecraft:stray", rel(0, 0, 0), {
              Tags: ["tnt.stray"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              HandItems: [{ id: "minecraft:bow", Count: NBT.byte(1) }, {}],
            });
            summon("minecraft:husk", rel(0, 0, 0), {
              Tags: ["tnt.husk"],
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.lightning",
        100,
        () => {
          particle("minecraft:flash", rel(0, 1, 0), [1, 1, 1], 0, 2, "force");
        },
        () => {
          summon("minecraft:marker", rel(0, 0, 0), {
            Invisible: NBT.byte(1),
            Tags: ["lightning.marker"],
          });
          schedule.function(
            MCFunction("custom_tnt/auxillary/schedule_kill", () => {
              kill(
                Selector("@e", {
                  type: "minecraft:marker",
                  tag: "lightning.marker",
                })
              );
            }),
            "100t",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.nuclear",
        100,
        () => {
          particle("minecraft:crimson_spore", rel(0, 0.8, 0), [0, 0, 0], 0, 20, "force");
          particle("minecraft:soul_fire_flame", rel(0, 0.8, 0), [0, 0, 0], 0.1, 5, "force");
          raw(`particle angry_villager ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            CustomName: '{"text":"TNT","italic":false}',
            ExplosionRadius: NBT.byte(12),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.warden",
        100,
        () => {
          raw(`particle falling_dust black_concrete ~ ~0.8 ~ 0.5 0.5 0.5 1 2 normal`);
          particle("minecraft:smoke", rel(0, 0.8, 0), [0.2, 0.2, 0.2], 0.1, 5, "force");
          // raw(`particle sonic_boom ~ ~1 ~ 0.5 0.5 0.5 1 1 force`);
        },
        () => {
          summon("minecraft:warden", rel(0, 0, 0), {
            Brain: {
              memories: {
                '"minecraft:dig_cooldown"': { ttl: NBT.long(1200), value: {} },
                '"minecraft:is_emerging"': { ttl: NBT.long(134), value: {} },
              },
            },
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.bees",
        100,
        () => {
          raw(`particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 4 force`);
          raw(`particle minecraft:falling_nectar ~ ~0.8 ~ 0.3 0.3 0.3 1 20 force`);
        },
        () => {
          gamerule("universalAnger", true);
          for (let i = 0; i < 20; i++) {
            summon("minecraft:bee", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              AngerTime: 19999980,
              DeathLootTable: "minecraft:bat",
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.honey",
        100,
        () => {
          raw(`particle minecraft:block honey_block ~ ~0.8 ~ 0.3 0.3 0.3 1 2 force`);
          raw(`particle minecraft:falling_honey ~ ~0.8 ~ 0.5 0.5 0.5 1 4 force`);
        },
        () => {
          raw(`fill ~-2 ~-2 ~-2 ~2 ~ ~2 minecraft:honey_block replace #aestd1:all_but_air`);
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            CustomName: '{"text":"TNT","italic":false}',
            ExplosionRadius: NBT.byte(2),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.creeper",
        100,
        () => {
          raw(`particle minecraft:ambient_entity_effect ~ ~0.8 ~ 0.1 0.1 0.1 1 10 force`);
        },
        () => {
          for (let i = 0; i < 5; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
              ExplosionRadius: NBT.byte(2),
            });
          }
          for (let i = 0; i < 2; i++) {
            summon("minecraft:creeper", rel(0, 0, 0), {
              Motion: [
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
                +lodash.random(0.2, 0.9, true).toFixed(1),
              ],
              DeathLootTable: "minecraft:bat",
              powered: NBT.byte(1),
              ExplosionRadius: NBT.byte(2),
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.meteor",
        100,
        () => {
          for (let i = 0; i < 20; i++) {
            particle(
              "minecraft:falling_dust",
              "minecraft:red_concrete",
              rel(Math.sin(i) * 2, 1, Math.cos(i) * 2),
              [0, 0, 0],
              0,
              1,
              "force"
            );
          }
          particle("minecraft:ash", rel(0, 0.8, 0), [0.1, 0.5, 0.1], 0.1, 50, "force");
        },
        () => {
          raw(
            `summon fireball ~ ~100 ~ {ExplosionPower:6b,power:[0.0,-0.3,0.0],Item:{id:"minecraft:wooden_hoe",Count:1b,tag:{CustomModelData:100001}}}`
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.arrow",
        100,
        () => {
          particle("minecraft:crit", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0, 2, "force");
          particle("minecraft:item", "minecraft:arrow", rel(0, 1.3, 0), [0, 0.3, 0], 0, 4, "force");
        },
        () => {
          // Square Generation
          for (let i = -10; i <= 10; i += 1) {
            for (let j = -10; j <= 10; j += 1) {
              summon("minecraft:arrow", rel(i, randomIntFromInterval(30, 40), j), {
                Tags: ["tnt_arrow"],
              });
              summon("minecraft:arrow", rel(i, randomIntFromInterval(60, 70), j), {
                Potion: "minecraft:poison",
                Tags: ["tnt_arrow"],
              });
            }
          }

          // Kill the arrows
          schedule.function(
            () => {
              kill(Selector("@e", { type: "minecraft:arrow", tag: "tnt_arrow" }));
            },
            "150t",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ghost",
        100,
        () => {
          particle("minecraft:block", "minecraft:black_concrete", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0, 2, "force");
          // @ts-ignore
          particle("minecraft:dust", [0, 0, 0], 1, rel(0, 0.8, 0), [0, 0.3, 0], 0.01, 4, "force");
        },
        () => {
          summon("minecraft:block_display", rel(0, 0, 0), {
            transformation: {
              left_rotation: [NBT.float(0), NBT.float(0), NBT.float(0), NBT.float(1)],
              right_rotation: [NBT.float(0), NBT.float(0), NBT.float(0), NBT.float(1)],
              translation: [NBT.float(-2.5), NBT.float(0), NBT.float(-2.5)],
              scale: [NBT.float(5), NBT.float(5), NBT.float(5)],
            },
            block_state: { Name: "minecraft:black_concrete" },
            Tags: ["ghost_block_display"],
          });
          playsound("minecraft:ambient.crimson_forest.mood", "master", "@a", rel(0, 0, 0));
          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:block_display",
                    tag: "ghost_block_display",
                  })
                )
                .at(self)
                .run(() => {
                  kill(self);
                  particle(
                    // @ts-ignore
                    "minecraft:dust",
                    [0, 0, 0],
                    1,
                    rel(0, 0.8, 0),
                    [3, 3, 3],
                    0.1,
                    5000
                  );
                });
            },
            "5s",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.ender",
        100,
        () => {
          particle("minecraft:crimson_spore", rel(0, 0.8, 0), [0.5, 0.5, 0.5], 0, 2, "force");
          particle("minecraft:reverse_portal", rel(0, 0.8, 0), [0, 0.3, 0], 0.01, 4, "force");
        },
        () => {
          teleportWithinArena();
        },
        null,
        () => {
          for (let i = 0; i < 40; i++) {
            particle("minecraft:portal", rel(Math.sin(i) * 10, 1, Math.cos(i) * 10), [0, 0, 0], 0, 1, "force");
          }
        }
      );
      explosionHandler(
        "tnt.normal",
        100,
        () => {
          particle("minecraft:smoke", rel(0, 0.8, 0), [0.1, 0.3, 0.1], 0.1, 2, "force");
        },
        () => {
          summon("minecraft:creeper", rel(0, 0, 0), {
            Fuse: 0,
            ignited: NBT.byte(1),
            CustomName: '{"text":"TNT","italic":false}',
            ExplosionRadius: NBT.byte(2),
          });
        },
        null,
        null
      );
      explosionHandler(
        "tnt.nausea",
        100,
        () => {
          particle(
            // @ts-ignore
            "minecraft:dust_plume",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0.1,
            3,
            "force"
          );
        },
        () => {
          summon("minecraft:block_display", rel(0, 0, 0), {
            transformation: {
              left_rotation: [NBT.float(0), NBT.float(0), NBT.float(0), NBT.float(1)],
              right_rotation: [NBT.float(0), NBT.float(0), NBT.float(0), NBT.float(1)],
              translation: [NBT.float(-2.5), NBT.float(0), NBT.float(-2.5)],
              scale: [NBT.float(5), NBT.float(5), NBT.float(5)],
            },
            block_state: { Name: "minecraft:yellow_stained_glass" },
            Tags: ["nausea_block_display"],
          });
          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:block_display",
                    tag: "nausea_block_display",
                  })
                )
                .at(self)
                .run(() => {
                  kill(self);
                  particle(
                    // @ts-ignore
                    "minecraft:dust",
                    [1, 1, 0.14],
                    1,
                    rel(0, 0.8, 0),
                    [3, 3, 3],
                    0.1,
                    5000
                  );
                });
            },
            "5s",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.levitation",
        100,
        () => {
          particle("minecraft:ash", rel(0, 0.8, 0), [0.1, 0.5, 0.1], 0.1, 50, "force");
        },
        () => {
          effect.give(Selector("@a", { distance: [Infinity, 10] }), "minecraft:levitation", 3, 10, true); // ! Change the particle radius also
        },
        null,
        () => {
          for (let i = 0; i < 40; i++) {
            particle("minecraft:instant_effect", rel(Math.sin(i) * 10, 1, Math.cos(i) * 10), [0, 0, 0], 0, 1, "force");
          }
        }
      );
      explosionHandler(
        "tnt.wither",
        100,
        () => {
          // particle(
          //   "minecraft:block",
          //   "minecraft:black_concrete",
          //   rel(0, 0.8, 0),
          //   [0.5, 0.5, 0.5],
          //   0,
          //   2,
          //   "force"
          // );
          particle(
            // @ts-ignore
            "minecraft:dust",
            [0, 0, 0],
            1,
            rel(0, 0.8, 0),
            [0, 0.2, 0],
            1,
            15
          );
        },
        () => {
          summon("minecraft:wither", rel(0, 0, 0), {
            Tags: ["tnt_wither"],
            DeathLootTable: "minecraft:bat",
          });

          // Kill the wither after some time
          schedule.function(
            () => {
              execute
                .as(
                  Selector("@e", {
                    type: "minecraft:wither",
                    tag: "tnt_wither",
                  })
                )
                .at(self)
                .run(() => {
                  kill(self);
                  particle(
                    // @ts-ignore
                    "minecraft:dust",
                    [0, 0, 0],
                    1,
                    rel(0, 0.8, 0),
                    [1, 1, 1],
                    0.1,
                    100
                  );
                  particle("minecraft:poof", rel(0, 1, 0), [0, 0, 0], 0.1, 60);
                });
            },
            "10s",
            "replace"
          );
        },
        null,
        null
      );
      explosionHandler(
        "tnt.wwz",
        100,
        () => {
          particle(
            // @ts-ignore
            "minecraft:item",
            "rotten_flesh",
            rel(0, 0.8, 0),
            [0, 0, 0],
            0.1,
            10,
            "force"
          );
        },
        () => {
          for (let i = 0; i < 4; i++) {
            summon("minecraft:zombie", rel(0, 0, 0), {
              DeathLootTable: "minecraft:bat",
              Tags: ["tnt_mutant_zombie"],
              Health: NBT.float(30),
              Attributes: [
                { Name: "generic.max_health", Base: 30 },
                { Name: "generic.knockback_resistance", Base: 0.6 },
                { Name: "generic.movement_speed", Base: 0.2 },
                { Name: "generic.attack_damage", Base: 4 },
              ],
            });
          }
        },
        null,
        null
      );
      explosionHandler(
        "tnt.missile",
        100,
        () => {
          particle(
            // @ts-ignore
            "minecraft:block",
            "minecraft:red_concrete",
            rel(0, 0.8, 0),
            [0.1, 0.1, 0.1],
            0.1,
            6,
            "force"
          );
          particle(
            // @ts-ignore
            "minecraft:block",
            "minecraft:white_concrete",
            rel(0, 0.8, 0),
            [0.1, 0.1, 0.1],
            0.1,
            8,
            "force"
          );
        },
        () => {
          // Spawn a marker or anchor
          summon("minecraft:armor_stand", rel(0, 0, 0), {
            Tags: ["tnt_missile_anchor"],
            Marker: NBT.byte(1),
            Invisible: NBT.byte(1),
          });

          const missileAnchor = Selector("@e", {
            type: "minecraft:armor_stand",
            tag: "tnt_missile_anchor",
          });
          // Spawn few missile at different time
          functionCmd("missile:spawn_missile");

          let missileCount = Variable(1);
          let maxMissileCount = 5;

          // Recursively call the spawn missile function with base-case
          const spawnMissileFunction = MCFunction("misc/missile_tnt/spawn_missile", () => {
            schedule.function(
              () => {
                execute
                  .as(missileAnchor)
                  .at(self)
                  .run(() => {
                    functionCmd("missile:spawn_missile");
                    _.if(missileCount.lessThan(5), () => {
                      missileCount.add(1);
                      spawnMissileFunction();
                    });
                    _.if(missileCount.equalTo(maxMissileCount), () => {
                      kill(self);
                    });
                  });
              },
              "2s",
              "append"
            );
          });
          spawnMissileFunction();
        },
        null,
        null
      );
    });
});
