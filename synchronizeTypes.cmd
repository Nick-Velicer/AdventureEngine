set "baseDir=%cd%"

cd AdventureEngineClient
call generateTypes.cmd
cd %baseDir%

cd AdventureEngineServer
if not exist "./goTypeBase" mkdir goTypeBase
for %%f in ("../AdventureEngineClient/src/typeschema/generated/*.json") do go-jsonschema ../AdventureEngineClient/src/typeschema/generated/%%~nf.json -p goTypeBase --verbose > goTypeBase/%%~nf.go 

cd %baseDir%