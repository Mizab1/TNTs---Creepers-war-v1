import { Coordinates, MCFunction, NBT, Objective, _, abs, execute, playsound, scoreboard, setblock, title } from "sandstone";
import { self } from "../../Tick";
import { b } from "../../Utils/Functions";
import { joinedTeam } from "../Teams/Tick";
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

//! Time is in 60 Secs format
const timerPrivate = Objective.create("timer_pvt", "dummy");
export const settingTimer = timerPrivate("setting_timer");
export const countingTimer = timerPrivate("counting_timer");

export const timerInterval: number = 60;

// These are generics function like increasing and decreasing

const increaseTimer = MCFunction("game/timer/increase_timer", () => {
  // This command is used to obtain the timer sign
  // give @p warped_sign{BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true},{"text":"Increase ","color":"green"},{"text":"]"}]','{"text":""}','{"text":"+60 Secs","color":"blue","clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/timer/increase_timer"}}']}}} 1
  settingTimer.add(timerInterval);

  // Display the time
  setTimeSign(abs(7, 54, -34));

  playsound("minecraft:block.dispenser.dispense", "master", "@a", abs(7, 54, -34), 1, 1.2);
});

const decreaseTimer = MCFunction("game/timer/decrease_timer", () => {
  // This command is used to obtain the timer sign
  // give @p warped_sign{BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true},{"text":"Decrease ","color":"green"},{"text":"]"}]','{"text":""}','{"text":"-60 Secs","color":"red","clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/timer/decrease_timer"}}']}}} 1
  _.if(settingTimer.greaterThan(timerInterval), () => {
    settingTimer.remove(timerInterval);

    // Display the time
    setTimeSign(abs(7, 54, -34));

    playsound("minecraft:block.dispenser.dispense", "master", "@a", abs(7, 54, -34), 1, 1.4);
  });
});

const resetTimer = MCFunction("game/timer/reset_timer", () => {
  settingTimer.set(timerInterval);
});

const timerCountdown = MCFunction(
  "game/timer/timer_countdown",
  () => {
    _.if(isStarted.equalTo(1), () => {
      _.if(countingTimer.greaterThan(-1), () => {
        countingTimer.remove(1);

        // Update the timer bossbar
        execute.store.result.bossbar(bossbarTimerName, "value").run(() => {
          scoreboard.players.get(countingTimer.target, countingTimer.objective.name);
        });
      });

      _.if(countingTimer.matches([1, 3]), () => {
        execute.as(joinedTeam).at(self).run.playsound("minecraft:block.note_block.bell", "master", self);

        title(joinedTeam).title({ score: { name: countingTimer.target, objective: countingTimer.objective.name }, color: "red" });
      });
    });
  },
  {
    runEach: "20t",
  }
);

const debugTimer = MCFunction("game/timer/debug_timer", () => {
  settingTimer.set(10);
});
