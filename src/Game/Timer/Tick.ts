import {
  Coordinates,
  MCFunction,
  NBT,
  Objective,
  _,
  abs,
  execute,
  playsound,
  scoreboard,
  setblock,
} from "sandstone";
import { b } from "../../Utils/Functions";
import { bossbarTimerName, isStarted } from "../Tick";

// User Defined Functions
const setTimeSign = (coord: Coordinates) => {
  setblock(coord, "air");
  setblock(
    coord,
    b("minecraft:warped_wall_sign[facing=south]", {
      front_text: {
        messages: [
          '{"text":""}',
          '[{"text":"[ ","color":"gray","bold":true},{"text":"Timer","color":"green"},{"text":" ]"}]',
          '{"text":""}',
          '{"score":{"name":"setting_timer","objective":"timer_pvt"},"color":"dark_green","bold":true}',
        ],
      },
      is_waxed: NBT.byte(1),
    }),
    "replace"
  );
};

//! Time is in 10 Seconds format
const timerPrivate = Objective.create("timer_pvt", "dummy");
export const settingTimer = timerPrivate("setting_timer");
export const countingTimer = timerPrivate("counting_timer");

export const timerInterval: number = 10;

// These are generics function like increasing and decreasing

const increaseTimer = MCFunction("game/timer/increase_timer", () => {
  // This command is used to obtain the timer sign
  // give @p warped_sign{BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true},{"text":"Increase ","color":"green"},{"text":"]"}]','{"text":""}','{"text":"+10 Secs","color":"blue","clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/timer/increase_timer"}}']}}} 1
  settingTimer.add(timerInterval);

  // Display the time
  setTimeSign(abs(7, 54, -34));

  playsound(
    "minecraft:block.dispenser.dispense",
    "master",
    "@a",
    abs(7, 54, -34),
    1,
    1.2
  );
});

const decreaseTimer = MCFunction("game/timer/decrease_timer", () => {
  // This command is used to obtain the timer sign
  // give @p warped_sign{BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true},{"text":"Decrease ","color":"green"},{"text":"]"}]','{"text":""}','{"text":"-10 Secs","color":"red","clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/timer/decrease_timer"}}']}}} 1
  _.if(settingTimer.greaterThan(timerInterval), () => {
    settingTimer.remove(timerInterval);

    // Display the time
    setTimeSign(abs(7, 54, -34));

    playsound(
      "minecraft:block.dispenser.dispense",
      "master",
      "@a",
      abs(7, 54, -34),
      1,
      1.4
    );
  });
});

const resetTimer = MCFunction("game/timer/reset_timer", () => {
  settingTimer.set(timerInterval);
});

const timerCountdown = MCFunction(
  "game/timer/timer_countdown",
  () => {
    _.if(isStarted.equalTo(1), () => {
      _.if(countingTimer.greaterThan(0), () => {
        countingTimer.remove(1);

        // Update the timer bossbar
        execute.store.result.bossbar(bossbarTimerName, "value").run(() => {
          scoreboard.players.get(
            countingTimer.target,
            countingTimer.objective.name
          );
        });
      });
    });
  },
  {
    runEach: "20t",
  }
);
