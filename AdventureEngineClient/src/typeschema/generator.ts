import { existsSync, mkdir, readdirSync, writeFile } from "node:fs";
import { resolve } from "node:path";

import * as TJS from "typescript-json-schema";

const settings: TJS.PartialArgs = {
	required: true,
};

const compilerOptions: TJS.CompilerOptions = {
	strictNullChecks: true,
};

const basePath = "./types";

const typeFiles = readdirSync(resolve(basePath));

const program = TJS.getProgramFromFiles(typeFiles.map(file => resolve(basePath + "/" +file)), compilerOptions);

const generator = TJS.buildGenerator(program, settings);

const generatedFilesBasePath = "./generated";

if (!existsSync(generatedFilesBasePath)) {
	mkdir(generatedFilesBasePath, (err) => {
		if (err) {
			console.error("Error creating " + generatedFilesBasePath + ":", err);
		} else {
			console.log("Created " + generatedFilesBasePath);
		}
	});
}
else {
	console.log(generatedFilesBasePath + " already created.");
}

Promise.all(typeFiles.map((fileName) => {
	const typeName = fileName.split(".")[0];
	const schema = generator?.getSchemaForSymbol(typeName);
	const generatedLocation = generatedFilesBasePath + "/" + typeName + ".json";

	return (
		schema === undefined?
			Promise.reject("Failure writing to " + generatedLocation)
			:
			writeFile(generatedLocation, JSON.stringify(schema, null, 4)!, () => console.log("Wrote " + generatedLocation))
	);
}))
	.then(() => {})
	.catch((error) => {
		console.log("Could not complete JSON Schema Generation:");
		console.log(error);
	});
/*
// generator can be also reused to speed up generating the schema if usecase allows:
const schemaWithReusedGenerator = TJS.generateSchema(program, "MyType", settings, [], generator);

// all symbols
const symbols = generator.getUserSymbols();

// Get symbols for different types from generator.
generator.getSchemaForSymbol("MyType");
generator.getSchemaForSymbol("AnotherType");
*/