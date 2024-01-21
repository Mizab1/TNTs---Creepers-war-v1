execute as @s[scores={gravity_sneak=1..},tag=gravity_hold_entity] as @e[tag=gravity_target,sort=nearest,limit=1] at @s run tag @s remove gravity_base
kill @e[type=#gravity_guns:nonalive,tag=gravity_base,sort=nearest,limit=1]
execute as @e[tag=gravity_block,sort=nearest,limit=1,distance=..2] run data modify entity @s NoGravity set value 0

#===< Override if deselect >===
execute unless entity @s[nbt={SelectedItem:{tag:{gravity_guns:"gravity_gun"}}}] run scoreboard players set @s gravity_sneak 1

#===< Sounds >===
execute as @s[scores={gravity_sneak=0}] at @s run playsound gravity_guns:launch master @a ~ ~ ~ 0.3
execute as @s[scores={gravity_sneak=1..}] at @s run playsound gravity_guns:drop master @a ~ ~ ~ 0.3

#===< Block Throwing >===
execute as @s[scores={gravity_sneak=0}] positioned ^ ^-.3 ^3 run summon armor_stand ~ ~ ~ {Tags:["gravity_motion_vec"],Marker:1b,Invisible:1b,Invulnerable:1b,NoGravity:1b}

#===< Apply Motion >===
execute as @s[scores={gravity_sneak=0},tag=gravity_hold_block] as @e[tag=gravity_block,sort=nearest,limit=1] at @s run function gravity_guns:physics/motion
execute as @s[scores={gravity_sneak=0},tag=gravity_hold_entity] as @e[tag=gravity_base,sort=nearest,limit=1] at @s run function gravity_guns:physics/motion
execute as @s[scores={gravity_sneak=1..},tag=gravity_hold_entity] as @e[tag=gravity_base,sort=nearest,limit=1] at @s run tag @s remove gravity_base
execute as @e[tag=gravity_target,sort=nearest,limit=1] at @s run scoreboard players reset gravity_id