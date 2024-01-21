execute as @s[tag=gravity_kill] run kill @e[type=#gravity_guns:nonalive,tag=gravity_falling,sort=nearest,limit=1]
execute as @s[tag=gravity_kill] run data modify entity @e[tag=gravity_block,sort=nearest,limit=1] NoGravity set value 0
execute as @s[tag=gravity_kill] run kill @s

#===< Damage >===
execute at @s align xz positioned ~ ~-1 ~ as @e[sort=nearest,limit=1,type=!#gravity_guns:nonalive,tag=!gravity_cast,dx=1,dy=2] run function gravity_guns:misc/damage


tag @s[nbt={OnGround:1b,Motion:[0.0,0.0,0.0]}] add gravity_kill

execute as @s[tag=gravity_kill] align xyz positioned ~.5 ~ ~.5 run tp @s ~ ~ ~
tp @e[tag=gravity_falling,sort=nearest,limit=1,distance=..1.5] @s