tag @s add gravity_falling
tag @s remove gravity_base
data modify entity @e[tag=gravity_block,sort=nearest,limit=1] Glowing set value 0
kill @s

execute at @s run summon armor_stand ~ ~ ~ {Invisible:1b,Tags:["gravity_ent_gravity"],Silent:1b,Small:1b,Invulnerable:1}
