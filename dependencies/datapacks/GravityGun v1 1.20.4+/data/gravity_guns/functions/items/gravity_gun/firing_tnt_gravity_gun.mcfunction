fill ~0.5 ~0.5 ~0.5 ~-0.5 ~-0.5 ~-0.5 air replace tnt
execute positioned ~-.5 ~-.5 ~-.5 if entity @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0] run tag @s add gravity_hold_entity
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0,limit=1] add gravity_base
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0,limit=1] add picked_up
execute positioned ~-.5 ~-.5 ~-.5 run tag @e[type=armor_stand, tag=tnt.as ,dx=0,dy=0,dz=0,limit=1] add previously_picked