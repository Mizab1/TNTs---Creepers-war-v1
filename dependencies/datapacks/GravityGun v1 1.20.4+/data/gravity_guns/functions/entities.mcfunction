#===< Gravity Entities >===
execute as @s[tag=gravity_drag,type=falling_block] run data modify entity @s Time set value 0
execute as @s[tag=gravity_ent_gravity] at @s run function gravity_guns:items/gravity_gun/falling
execute as @s[tag=gravity_drag,tag=gravity_base] at @s unless entity @a[tag=gravity_using] run kill @s
execute as @s[tag=gravity_motion_vec] at @s unless entity @a[distance=..20] run kill @s
execute as @s[tag=gravity_block,nbt={NoGravity:1b}] at @s unless entity @e[tag=gravity_drag,tag=gravity_base,distance=..5] unless entity @a[distance=..20] run data merge entity @s {NoGravity:0b}
execute as @s[tag=gravity_block] at @s unless entity @e[tag=gravity_drag,tag=gravity_base,distance=..3] run function gravity_guns:entities/falling_fix
execute as @s[tag=gravity_chest_model] at @s unless entity @e[tag=gravity_drag,tag=gravity_base,distance=..3] run tp @s @e[tag=gravity_block,nbt={BlockState:{Name:"minecraft:chest"}},limit=1,sort=nearest]
execute as @s[tag=gravity_chest_model] at @s unless entity @e[tag=gravity_drag,tag=gravity_base,distance=..3] unless entity @e[tag=gravity_block,nbt={BlockState:{Name:"minecraft:chest"}},sort=nearest,distance=..1] run kill @s
execute as @s[tag=gravity_portal_pass] run scoreboard players add @s gravity_anti_portal 1
execute as @s[scores={gravity_anti_portal=5..}] run tag @s remove gravity_portal_pass
execute as @s[scores={gravity_anti_portal=5..}] run scoreboard players set @s gravity_anti_portal 0