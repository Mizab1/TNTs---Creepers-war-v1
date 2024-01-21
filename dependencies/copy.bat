@echo off


@REM Set World (Change This)
set "WorldName=Testing 4"


color 02
echo World Name: %WorldName%
pause
color 07


@REM Set path
set "DestDirectoryDatapacks=%AppData%\.minecraft\saves\%WorldName%\datapacks"
set "DestDirectoryResources=%AppData%\.minecraft\resourcepacks"
xcopy "datapacks\*" "%DestDirectoryDatapacks%\" /s /e /y
xcopy "resources\*" "%DestDirectoryResources%\" /s /e /y

