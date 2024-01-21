# particle minecraft:crit ~ ~ ~ 0 0 0 0 1
#===< Initiate >===
tag @s add gravity_exclude
execute store result score @s gravity_id run data get entity @s UUID[3]
scoreboard players add @s gravity_sneak 0

#===< Gravity Entity >===
fill ~0.5 ~0.5 ~0.5 ~-0.5 ~-0.5 ~-0.5 air replace tnt
execute positioned ~-.5 ~-.5 ~-.5 if entity @e[tag=!gravity_exclude,type=!player,type=!#gravity_guns:nonalive,dx=0,dy=0,dz=0] run tag @s add gravity_hold_entity
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[tag=!gravity_exclude,type=!player,type=!#gravity_guns:nonalive,dx=0,dy=0,dz=0,limit=1] add gravity_base
execute positioned ~-.5 ~-.5 ~-.5 if entity @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0] run tag @s add gravity_hold_entity
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0,limit=1] add gravity_base
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0,limit=1] add picked_up

#===< Gravity Blocks >===
# execute if block ~ ~ ~ #gravity_guns:dragable run tag @s add gravity_hold_block
# execute if block ~ ~ ~ #gravity_guns:dragable run scoreboard players set @s gravity_cast 1
# execute if block ~ ~ ~ #gravity_guns:dragable run function gravity_guns:summon/gravity_block
# execute if block ~ ~ ~ #gravity_guns:dragable run setblock ~ ~ ~ air

tag @s[tag=gravity_hold_block] add gravity_using
tag @s[tag=gravity_hold_entity] add gravity_using

#===< Assign id >===
execute as @s[tag=gravity_using] run scoreboard players operation @e[tag=gravity_base,sort=nearest,limit=1] gravity_id = @s gravity_id 

#===< Sounds >===
execute as @s[tag=gravity_using] at @s run playsound gravity_guns:pickup master @a ~ ~ ~ 0.3

#===< Iterate >===
scoreboard players remove @s gravity_cast 1
execute as @s[scores={gravity_cast=1..},tag=!gravity_using] positioned ^ ^ ^.5 run function gravity_guns:items/gravity_gun/trigger
scoreboard players set @s gravity_trigger 0
tag @s remove gravity_exclude