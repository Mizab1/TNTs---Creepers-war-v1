import type { SandstoneConfig } from "sandstone";
import { addDependencies } from "./AddDependencies";

export default {
  name: "TNTs & Creepers War v1",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "tnts_and_creepers_war",
  packUid: "-1o4aio1",
  // ! Change the World in the Batch file also
  // saveOptions: { path: "./.sandstone/output/datapack" },
  // saveOptions: { world: "Testing 4" },
  saveOptions: { world: "Gravity TNT" },
  // saveOptions: { world: "Gravity TNT - Copy" },
  onConflict: {
    default: "warn",
  },
  scripts: {
    afterAll: () => {
      // @ts-ignore
      let worldName = this.default.saveOptions.world;
      addDependencies(worldName);
    },
  },
} as SandstoneConfig;
