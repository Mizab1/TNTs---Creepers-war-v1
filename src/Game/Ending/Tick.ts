import { MCFunction, Selector, _, execute, raw, tellraw, title } from "sandstone";
import { self } from "../../Tick";
import { randFromArray, randomIntFromInterval } from "../../Utils/Functions";
import { deathScore, deathScoreObj, findMinDeathScore, minDeathScore } from "../Scores/DeathScore";
import { endGame } from "../Tick";
import { countingTimer } from "../Timer/Tick";
import { joinedTeam } from "../Teams/Tick";

const tick = MCFunction(
  "game/ending/tick",
  () => {
    _.if(countingTimer.matches(0), () => {
      // Initialize the endgame sequence
      endGame();

      // Display the death scores of the players
      displayScore();

      // Decide who won
      greetWinner();
    });
  },
  {
    runEachTick: true,
  }
);

const displayScore = () => {
  execute.as(joinedTeam).run(() => {
    tellraw("@a", [
      { selector: "@s ", color: "#DFFF94" },
      { text: " died ", color: "white" },
      {
        score: { name: "@s ", objective: deathScoreObj.name },
        color: "#57B6FF",
      },
      { text: " time(s)", color: "white" },
    ]);
  });
};

const greetWinner = MCFunction("game/ending/greet_winner", () => {
  findMinDeathScore();

  execute
    .as(joinedTeam)
    .at(self)
    .if.score(
      //@ts-ignore
      deathScore.target,
      deathScore.objective.name,
      "=",
      minDeathScore.target,
      minDeathScore.objective.name
    )
    .run(() => {
      // _.if(Selector("@s", { tag: "blue" }), () => {
      //   greet("Blue");
      // }).else(() => {
      //   greet("Orange");
      // });
      const message = [
        {
          selector: "@s",
          color: "gold",
        },
        {
          text: " Won!",
          color: "white",
        },
      ];
      title("@a").title(message);
      tellraw("@a", message);

      const fireworksList = [
        `Colors:[I;10371112,10205445,3230842,8508626]`,
        `Colors:[I;16537390,13958912,2312586,3179906]`,
        `Colors:[I;11286555,11388210,2703204,3454128]`,
        `Colors:[I;16746345,15073123,6199807,4718585]`,
        `Colors:[I;15163969,10466860,5601201,10025205]`,
        `Colors:[I;12875363,12044133,5997253,4825502]`,
      ];
      for (let i = 1; i <= 50; i++) {
        raw(
          `summon minecraft:firework_rocket ~${Math.sin(i) * 6} ~ ~${Math.cos(i) * 6} {LifeTime:${randomIntFromInterval(
            15,
            30
          )},FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Trail:1b,${randFromArray(
            fireworksList
          )}}]}}}}`
        );
      }
    });
});

// const greet = (team: string) => {
//   const message = [
//     {
//       text: "Team ",
//       color: "white",
//     },
//     {
//       text: team,
//       color: "gold",
//     },
//     {
//       text: " Won!",
//       color: "white",
//     },
//   ];
//   title("@a").title(message);
//   tellraw("@a", message);

//   const fireworksList = [
//     `Colors:[I;10371112,10205445,3230842,8508626]`,
//     `Colors:[I;16537390,13958912,2312586,3179906]`,
//     `Colors:[I;11286555,11388210,2703204,3454128]`,
//     `Colors:[I;16746345,15073123,6199807,4718585]`,
//     `Colors:[I;15163969,10466860,5601201,10025205]`,
//     `Colors:[I;12875363,12044133,5997253,4825502]`,
//   ];
//   for (let i = 1; i <= 50; i++) {
//     raw(
//       `summon minecraft:firework_rocket ~${Math.sin(i) * 6} ~ ~${Math.cos(i) * 6} {LifeTime:${randomIntFromInterval(
//         15,
//         30
//       )},FireworksItem:{id:"firework_rocket",Count:1,tag:{Fireworks:{Explosions:[{Type:1,Trail:1b,${randFromArray(
//         fireworksList
//       )}}]}}}}`
//     );
//   }
// };
