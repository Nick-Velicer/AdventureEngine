import { existsSync, mkdir, readdirSync, writeFile } from "node:fs";
import { resolve } from "node:path";
import * as TJS from "typescript-json-schema";

//Generating flattened types (everything on one object level and relationships reduced to their id's)

const corePath = "./coreTypes";
const flattenedPath = "./flattenedTypes";

const coreTypeFileNames = readdirSync(resolve(corePath));

const flattenedTypeFileContents = (typeName: string) => {
	const lines = [
		'import { ' + typeName + ' } from "../coreTypes/' + typeName + '";',
		'import { FlattenedSchemaObject } from "../SchemaObject";',
		'export type Flattened' + typeName + ' = FlattenedSchemaObject<' + typeName + '>;' 
	]
	return lines.join("\n");
}

if (!existsSync(flattenedPath)) {
	mkdir(flattenedPath, (err) => {
		if (err) {
			console.error("Error creating " + flattenedPath + ":", err);
		} else {
			console.log("Created " + flattenedPath);
		}
	});
}
else {
	console.log(flattenedPath + " already created.");
}

await Promise.all(coreTypeFileNames.map((fileName) => writeFile(flattenedPath + "/" + "Flattened" + fileName, flattenedTypeFileContents(fileName.replace(".ts", "")), (err) => {
	if (err) throw err;
	console.log("Flattened " + fileName);
})))

//Generating json schemas from the flattened types

const generatedFilesBasePath = "./generated";

const settings: TJS.PartialArgs = {
	required: true
};

const compilerOptions: TJS.CompilerOptions = {
	strictNullChecks: true,
};

const flattenedTypeFiles = readdirSync(resolve(flattenedPath));
console.log(flattenedTypeFiles);


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

Promise.all(flattenedTypeFiles.map((fileName) => {

	const program = TJS.getProgramFromFiles([resolve("flattenedTypes/" + fileName)], compilerOptions);
	const typeName = fileName.split(".")[0];

	console.log(typeName);

	const schema = TJS.generateSchema(program, typeName, settings);

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

