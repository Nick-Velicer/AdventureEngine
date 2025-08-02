set "baseDir=%cd%"

cd AdventureEngineClient
call generateTypes.cmd
cd %baseDir%

cd AdventureEngineServer
if not exist "./generatedTypes" mkdir generatedTypes
for %%f in ("../AdventureEngineClient/src/typeschema/generated/*.json") do go-jsonschema --minimal-names -p generatedtypes ../AdventureEngineClient/src/typeschema/generated/%%~nf.json > generatedTypes/%%~nf.go 

cd %baseDir%