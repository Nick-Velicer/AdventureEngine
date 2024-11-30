set "baseDir=%cd%"

cd AdventureEngineClient/src/typeschema
deno run --allow-env --allow-read --allow-write generator.ts
cd %baseDir%

cd AdventureEngineServer
if not exist "./generated" mkdir generated
go-jsonschema -p main ../AdventureEngineClient/src/typeschema/generated/Quantifier.json > generated/typeTest.go
cd %baseDir%