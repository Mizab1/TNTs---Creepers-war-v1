# particle minecraft:crit ~ ~ ~ 0 0 0 0 1
#===< Initiate >===
tag @s add gravity_exclude
execute store result score @s gravity_id run data get entity @s UUID[3]
scoreboard players add @s gravity_sneak 0

#===< Gravity Entity >===

# Lifting TNTs
execute if entity @s[nbt={SelectedItem:{id:"minecraft:warped_fungus_on_a_stick",Count:1b,tag:{tnt_gravity_gun:1b}}}] run function gravity_guns:items/gravity_gun/firing_tnt_gravity_gun

# Lifting Mobs
execute if entity @s[nbt={SelectedItem:{id:"minecraft:warped_fungus_on_a_stick",Count:1b,tag:{tnt_gravity_gun:1b}}}] run function gravity_guns:items/gravity_gun/firing_tnt_gravity_gun



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