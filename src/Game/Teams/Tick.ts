import { MCFunction, Selector, _, playsound, rel, tag, tellraw } from "sandstone";
import { self } from "../../Tick";

export const joinedTeam = Selector("@a", { tag: "joined_team" });

export const teamOrangeMember = Selector("@a", { tag: "orange" });
export const teamBlueMember = Selector("@a", { tag: "blue" });

// Command to generate a sign
// give @p warped_sign{display:{Name:'{"text":"join blue"}'},BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true,"italic":false},{"text":"Team","color":"gold"},{"text":" ]","color":"gray","bold":true,"italic":false}]','{"text":""}','{"text":"Join Orange","color":"yellow","bold":true,"italic":false,"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/teams/join_orange"}}']},is_waxed:1b}} 1
const joinOrange = MCFunction("game/teams/join_orange", () => {
  _.if(Selector("@s", { tag: "!orange" }), () => {
    tag(self).add("joined_team");
    tag(self).add("orange");
    tag(self).remove("blue");

    tellraw(self, [
      { text: "You joined team ", color: "white" },
      { text: "Orange", color: "green" },
    ]);

    playsound("minecraft:block.note_block.bell", "master", self, rel(0, 0, 0), 1, 1.4);
  }).else(() => {
    tellraw(self, [{ text: "You're already in the team Orange", color: "red" }]);
    playsound("minecraft:block.note_block.didgeridoo", "master", self, rel(0, 0, 0), 1, 1.7);
  });
});

// Command to generate a sign
//give @p warped_sign{display:{Name:'{"text":"join blue"}'},BlockEntityTag:{front_text:{messages:['{"text":""}','[{"text":"[ ","color":"gray","bold":true,"italic":false},{"text":"Team","color":"gold"},{"text":" ]","color":"gray","bold":true,"italic":false}]','{"text":""}','{"text":"Join Blue","color":"blue","bold":true,"italic":false,"clickEvent":{"action":"run_command","value":"/function tnts_and_creepers_war:game/teams/join_blue"}}']},is_waxed:1b}} 1
const joinBlue = MCFunction("game/teams/join_blue", () => {
  _.if(Selector("@s", { tag: "!blue" }), () => {
    tag(self).add("joined_team");
    tag(self).add("blue");
    tag(self).remove("orange");

    tellraw(self, [
      { text: "You joined team ", color: "white" },
      { text: "Blue", color: "blue" },
    ]);

    playsound("minecraft:block.note_block.bell", "master", self, rel(0, 0, 0), 1, 1.4);
  }).else(() => {
    tellraw(self, [{ text: "You're already in the team Blue", color: "red" }]);
    playsound("minecraft:block.note_block.didgeridoo", "master", self, rel(0, 0, 0), 1, 1.7);
  });
});
