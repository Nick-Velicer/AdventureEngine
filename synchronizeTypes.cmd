set "baseDir=%cd%"

cd AdventureEngineClient
call generateTypes.cmd
cd %baseDir%

cd AdventureEngineServer
if not exist "./generated" mkdir generated
for %%f in ("../AdventureEngineClient/src/typeschema/generated/*.json") do go-jsonschema --minimal-names -p main ../AdventureEngineClient/src/typeschema/generated/%%~nf.json > generated/%%~nf.go 

cd %baseDir%