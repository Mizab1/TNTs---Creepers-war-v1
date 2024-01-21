#===< Calculate distance to nearest wall >===
scoreboard players add @s gravity_distance 1
execute if block ~ ~ ~ #gravity_guns:nonsolid as @s[scores={gravity_distance=..3}] positioned ^ ^ ^1 run function gravity_guns:items/gravity_gun/distance