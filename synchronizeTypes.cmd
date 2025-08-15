set "baseDir=%cd%"

cd AdventureEngineClient
call generateTypes.cmd

cd %baseDir%
cd AdventureEngineClient
call python regenerateFrontendServices.py
cd %baseDir%

cd AdventureEngineServer
if not exist "./goTypeBase" mkdir goTypeBase
for %%f in ("../AdventureEngineClient/types/generated/*.json") do go-jsonschema ../AdventureEngineClient/types/generated/%%~nf.json -p goTypeBase --verbose > goTypeBase/%%~nf.go 

call python regenerateBackend.py

cd %baseDir%
