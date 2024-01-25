scoreboard players add @s gravity_power 0

execute as @e[tag=gravity_motion_vec,limit=1,sort=nearest] store result score @s gravity_motion_x run data get entity @s Pos[0] 100
execute as @e[tag=gravity_motion_vec,limit=1,sort=nearest] store result score @s gravity_motion_y run data get entity @s Pos[1] 100
execute as @e[tag=gravity_motion_vec,limit=1,sort=nearest] store result score @s gravity_motion_z run data get entity @s Pos[2] 100

execute store result score @s gravity_motion_x run data get entity @s Pos[0] 100
execute store result score @s gravity_motion_y run data get entity @s Pos[1] 100
execute store result score @s gravity_motion_z run data get entity @s Pos[2] 100

scoreboard players operation @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_x -= @s gravity_motion_x
scoreboard players operation @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_y -= @s gravity_motion_y
scoreboard players operation @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_z -= @s gravity_motion_z

#===< Store motion in entity >===
execute store result score @s gravity_motion_x run scoreboard players get @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_x
execute store result score @s gravity_motion_y run scoreboard players get @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_y
execute store result score @s gravity_motion_z run scoreboard players get @e[tag=gravity_motion_vec,limit=1,sort=nearest] gravity_motion_z

#===< Motion Default >===
data merge storage gravity_guns:motion {Motion:[0d,0d,0d]}
execute as @s[scores={gravity_power=0},type=falling_block] store result storage gravity_guns:motion Motion[0] double 0.003 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=0},type=falling_block] store result storage gravity_guns:motion Motion[1] double 0.003 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=0},type=falling_block] store result storage gravity_guns:motion Motion[2] double 0.003 run scoreboard players get @s gravity_motion_z
execute as @s[scores={gravity_power=0},type=!falling_block] store result storage gravity_guns:motion Motion[0] double 0.007 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=0},type=!falling_block] store result storage gravity_guns:motion Motion[1] double 0.007 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=0},type=!falling_block] store result storage gravity_guns:motion Motion[2] double 0.007 run scoreboard players get @s gravity_motion_z

# Edit this!
execute as @s[scores={gravity_power=1},type=falling_block] store result storage gravity_guns:motion Motion[0] double 0.005 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=1},type=falling_block] store result storage gravity_guns:motion Motion[1] double 0.005 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=1},type=falling_block] store result storage gravity_guns:motion Motion[2] double 0.005 run scoreboard players get @s gravity_motion_z
execute as @s[scores={gravity_power=1},type=!falling_block] store result storage gravity_guns:motion Motion[0] double 0.013 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=1},type=!falling_block] store result storage gravity_guns:motion Motion[1] double 0.01 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=1},type=!falling_block] store result storage gravity_guns:motion Motion[2] double 0.013 run scoreboard players get @s gravity_motion_z
# End

execute as @s[scores={gravity_power=2},type=falling_block] store result storage gravity_guns:motion Motion[0] double 0.015 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=2},type=falling_block] store result storage gravity_guns:motion Motion[1] double 0.015 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=2},type=falling_block] store result storage gravity_guns:motion Motion[2] double 0.015 run scoreboard players get @s gravity_motion_z
execute as @s[scores={gravity_power=2},type=!falling_block] store result storage gravity_guns:motion Motion[0] double 0.029 run scoreboard players get @s gravity_motion_x
execute as @s[scores={gravity_power=2},type=!falling_block] store result storage gravity_guns:motion Motion[1] double 0.025 run scoreboard players get @s gravity_motion_y
execute as @s[scores={gravity_power=2},type=!falling_block] store result storage gravity_guns:motion Motion[2] double 0.029 run scoreboard players get @s gravity_motion_z

execute as @s run data modify entity @s Motion set from storage gravity_guns:motion Motion

#===< Reset >===
kill @e[tag=gravity_motion_vec,limit=1,sort=nearest]
tag @s remove gravity_base