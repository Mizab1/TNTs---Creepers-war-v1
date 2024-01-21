tag @s add gravity_cast
scoreboard players set @s gravity_distance -2
scoreboard players add @s gravity_power 0
execute positioned ^ ^-0.3 ^ run function gravity_guns:items/gravity_gun/distance
execute at @s as @e[tag=gravity_base,tag=!gravity_portal_pass,sort=nearest] if score @s gravity_id = @p gravity_id run tag @s add gravity_target

#===< Determine Power >===
execute as @s[scores={gravity_trigger=1..}] store result score @s gravity_power run data get entity @s SelectedItem.tag.gravity_power
execute as @s[scores={gravity_trigger=1..}] run scoreboard players operation @e[tag=gravity_target,limit=1,sort=nearest] gravity_power = @s gravity_power 
execute as @s[scores={gravity_trigger=1..}] at @e[tag=gravity_target,type=armor_stand,limit=1,sort=nearest] run scoreboard players operation @e[tag=gravity_block,limit=1,sort=nearest,distance=..5] gravity_power = @s gravity_power 

#===< Main Functionality >===
execute as @s[scores={gravity_distance=..0}] positioned ^ ^-0.3 ^ as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align
execute as @s[scores={gravity_distance=1}] positioned ^ ^-0.3 ^1 as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align
execute as @s[scores={gravity_distance=2}] positioned ^ ^-0.3 ^2 as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align
execute as @s[scores={gravity_distance=3}] positioned ^ ^-0.3 ^3 as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align
execute as @s[scores={gravity_distance=4}] positioned ^ ^-0.3 ^4 as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align
execute as @s[scores={gravity_distance=5}] positioned ^ ^-0.3 ^5 as @e[tag=gravity_target,sort=nearest,limit=1] run function gravity_guns:items/gravity_gun/align

tag @s remove gravity_cast

#===< Stop >===
execute if entity @e[tag=gravity_target] as @s[scores={gravity_trigger=1..,gravity_distance=1}] at @s anchored eyes positioned ^ ^ ^1 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_trigger=1..,gravity_distance=2}] at @s anchored eyes positioned ^ ^ ^2 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_trigger=1..,gravity_distance=3}] at @s anchored eyes positioned ^ ^ ^3 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_trigger=1..,gravity_distance=4}] at @s anchored eyes positioned ^ ^ ^4 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_trigger=1..,gravity_distance=5}] at @s anchored eyes positioned ^ ^ ^5 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_distance=1}] unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] at @s anchored eyes positioned ^ ^ ^1 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_distance=2}] unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] at @s anchored eyes positioned ^ ^ ^2 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_distance=3}] unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] at @s anchored eyes positioned ^ ^ ^3 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_distance=4}] unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] at @s anchored eyes positioned ^ ^ ^4 run function gravity_guns:items/gravity_gun/stop
execute if entity @e[tag=gravity_target] as @s[scores={gravity_distance=5}] unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] at @s anchored eyes positioned ^ ^ ^5 run function gravity_guns:items/gravity_gun/stop
execute as @s[scores={gravity_trigger=1..}] run function gravity_guns:items/gravity_gun/reset
execute unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] run function gravity_guns:items/gravity_gun/reset
tag @e remove gravity_target