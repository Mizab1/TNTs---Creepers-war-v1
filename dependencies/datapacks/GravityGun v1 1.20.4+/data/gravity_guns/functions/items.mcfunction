scoreboard players set @s gravity_cast 20

execute as @s[tag=!gravity_using,scores={gravity_trigger=1..},nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] anchored eyes run function gravity_guns:items/gravity_gun/trigger
execute as @s[tag=gravity_using] at @s anchored eyes run function gravity_guns:items/gravity_gun


