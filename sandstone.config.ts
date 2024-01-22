import type { SandstoneConfig } from "sandstone";
import { execSync } from "child_process";

export default {
  name: "TNTs & Creepers War v1",
  description: ["A datapack by ", { text: "Mizab", color: "gold" }],
  formatVersion: 26,
  namespace: "tnts_and_creepers_war",
  packUid: "-1o4aio1",
  // ! Change the World in the Batch file also
  // saveOptions: { path: "./.sandstone/output/datapack" },
  saveOptions: { world: "Testing 4" },
  // saveOptions: { world: "Gravity TNT" },
  onConflict: {
    default: "warn",
  },
  // scripts: {
  //   afterAll: () => {
  //     // @ts-ignore
  //     let worldName = this.default.saveOptions.world;
  //     if (worldName) {
  //       // Variables for robocopy & command in in the batch file
  //       // let srcDirectoryDatapacks = `dependencies\\datapacks`;
  //       // let destDirectoryDatapacks = `%AppData%\\.minecraft\\saves\\${worldName}\\datapacks`;

  //       // let srcDirectoryResources = `dependencies\\resources`;
  //       // let destDirectoryResources = `%AppData%\\.minecraft\\resourcepacks`;

  //       let srcDirectoryDatapacks = `dependencies\\datapacks\\*`;
  //       let destDirectoryDatapacks = `%AppData%\\.minecraft\\saves\\${worldName}\\datapacks\\`;

  //       let srcDirectoryResources = `dependencies\\resources\\*`;
  //       let destDirectoryResources = `%AppData%\\.minecraft\\resourcepacks`;
  //       try {
  //         execSync(
  //           `xcopy "${srcDirectoryDatapacks}" "${destDirectoryDatapacks}" /s /e /y /v`,
  //           { stdio: "inherit" }
  //         );
  //         execSync(
  //           `xcopy "${srcDirectoryResources}" "${destDirectoryResources}" /s /e /y /v`,
  //           { stdio: "inherit" }
  //         );
  //         console.log(`Copied: Datapacks to ${destDirectoryDatapacks}`);
  //         console.log(`Copied: Datapacks to ${destDirectoryResources}`);
  //       } catch (error) {
  //         console.error(
  //           `Error copying ${srcDirectoryDatapacks}: ${error.message}`
  //         );
  //         console.error(
  //           `Error copying ${srcDirectoryResources}: ${error.message}`
  //         );
  //       }
  //     } else {
  //       console.error("saveOption is set to path and not world");
  //     }
  //   },
  // },
} as SandstoneConfig;
