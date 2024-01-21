import type { SandstoneConfig } from "sandstone";

export default {
  name: "TNTs & Creepers War v1",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "tnts_and_creepers_war",
  packUid: "-1o4aio1",
  // saveOptions: { path: "./.sandstone/output/datapack" },
  saveOptions: { world: "Gravity TNT" },
  onConflict: {
    default: "warn",
  },
} as SandstoneConfig;
