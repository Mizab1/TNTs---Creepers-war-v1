import {
  Coordinates,
  MCFunction,
  NBT,
  Objective,
  _,
  abs,
  playsound,
  setblock,
} from "sandstone";
import { b } from "../../Utils/Functions";

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

//! Time is in minutes
const timerPrivate = Objective.create("timer_pvt", "dummy");
const settingTimer = timerPrivate("setting_timer");
const countingTimer = timerPrivate("counting_timer");

// These are generics function like increasing and decreasing

const increaseTimer = MCFunction("game/timer/increase_timer", () => {
  // This command is used to obtain the timer sign
  // give @p warped_sign{BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true},{"text":"Increase ","color":"green"},{"text":"]"}]','{"text":""}','{"text":"+10 Secs","color":"blue","clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/timer/increase_timer"}}']}}} 1
  settingTimer.add(1);

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
  _.if(settingTimer.greaterThan(1), () => {
    settingTimer.remove(1);

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
  settingTimer.set(1);
});
