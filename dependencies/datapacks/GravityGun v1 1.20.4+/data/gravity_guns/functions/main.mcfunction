#===< Main Procedure >===
# execute as @s[tag=!gravity_setup] run function gravity_guns:setup 
execute as @a at @s run function gravity_guns:items
execute as @e at @s run function gravity_guns:entities
execute as @a run function gravity_guns:reset

# Align the TNT
# execute as @e[type=minecraft:armor_stand, tag=tnt.as, tag=!gravity_base] at @s unless block ~ ~-0.5 ~ #aestd1:air run function gravity_guns:align_tnt