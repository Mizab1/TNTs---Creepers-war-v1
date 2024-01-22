@echo off


@REM Set World (Change This)
set "WorldName=Testing 4"


color e
echo World Name: %WorldName%
pause
color 07


@REM Set path
set "DestDirectoryDatapacks=%AppData%\.minecraft\saves\%WorldName%\datapacks"
set "DestDirectoryResources=%AppData%\.minecraft\resourcepacks"
xcopy "datapacks\*" "%DestDirectoryDatapacks%\" /s /e /y /v
xcopy "resources\*" "%DestDirectoryResources%\" /s /e /y /v

@REM Robocopy command
@REM robocopy "datapacks\*" "%DestDirectoryDatapacks%\" /e /mir 
@REM robocopy "${srcDirectoryDatapacks}" "${destDirectoryDatapacks}" /e /mir

