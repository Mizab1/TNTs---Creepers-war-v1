#===< Check whether its inside a block >===
execute unless block ~.5 ~ ~ #gravity_guns:nonsolid run tag @s add gravity_ax
execute unless block ~-.5 ~ ~ #gravity_guns:nonsolid run tag @s add gravity_ax
execute unless block ~ ~ ~.5 #gravity_guns:nonsolid run tag @s add gravity_az
execute unless block ~ ~ ~-.5 #gravity_guns:nonsolid run tag @s add gravity_az
execute unless block ~ ~.5 ~ #gravity_guns:nonsolid run tag @s add gravity_ay
execute unless block ~ ~-.5 ~ #gravity_guns:nonsolid run tag @s add gravity_ay

execute unless entity @s[nbt={FallDistance:0f}] run data modify entity @s FallDistance set value 0f

#===< Do the teleportation >===
execute as @s[tag=!gravity_ax,tag=!gravity_ay,tag=!gravity_az] run tp @s ~ ~ ~
execute as @s[tag=gravity_ax,tag=!gravity_ay,tag=!gravity_az] align x positioned ~.5 ~.01 ~ run tp @s ~ ~ ~
execute as @s[tag=gravity_ay,tag=!gravity_ax,tag=!gravity_az] align y positioned ~ ~.01 ~ run tp @s ~ ~ ~
execute as @s[tag=gravity_az,tag=!gravity_ay,tag=!gravity_ax] align z positioned ~ ~.01 ~.5 run tp @s ~ ~ ~
execute as @s[tag=gravity_ax,tag=gravity_ay,tag=!gravity_az] align xy positioned ~.5 ~.01 ~ run tp @s ~ ~ ~
execute as @s[tag=gravity_az,tag=gravity_ax,tag=!gravity_ay] align xz positioned ~.5 ~.01 ~.5 run tp @s ~ ~ ~
execute as @s[tag=gravity_az,tag=!gravity_ax,tag=gravity_ay] align yz positioned ~ ~.01 ~.5 run tp @s ~ ~ ~
execute as @s[tag=gravity_az,tag=gravity_ax,tag=gravity_ay] align xyz positioned ~.5 ~.01 ~.5 run tp @s ~ ~ ~

#===< Damage >===
execute as @s[type=#gravity_guns:nonalive] align xz positioned ~ ~-1 ~ as @e[sort=nearest,limit=1,type=!#gravity_guns:nonalive,tag=!gravity_cast,dx=1,dy=2] run function gravity_guns:misc/damage

#===< Reset >===
tag @s remove gravity_ax
tag @s remove gravity_ay
tag @s remove gravity_az