#===< Main Procedure >===
# execute as @s[tag=!gravity_setup] run function gravity_guns:setup 
execute as @a at @s run function gravity_guns:items
execute as @e at @s run function gravity_guns:entities
execute as @a run function gravity_guns:reset