import { existsSync, mkdir, readdirSync, writeFile, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as TJS from "typescript-json-schema";

//Generating flattened types (everything on one object level and relationships reduced to their id's)

const corePath = "./coreTypes";
const flattenedPath = "./flattenedTypes";

const coreTypeFileNames = readdirSync(resolve(corePath));

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

const flattenedTypeImports = (typeNames: Array<string>) => {
	return [
		'import { FlattenedSchemaObject } from "../SchemaObject";'
	].concat(typeNames.map((typeName) => {
		return 'import { ' + typeName + ' } from "../coreTypes/' + typeName + '";'
	})).concat([
		'import { Simplify } from "type-fest";'
	]).join("\n");
}

const flattenedTypes = (typeNames: Array<string>) => {
	return typeNames.map((typeName) => 'export type Flattened' + typeName + ' = Simplify<FlattenedSchemaObject<' + typeName + '>>;' ).join("\n");
}

const typeNames: Array<string> = coreTypeFileNames.map((fileName) => fileName.replace(".ts", ""));

writeFileSync(flattenedPath + "/flattenedTypes.ts", flattenedTypeImports(typeNames) + "\n\n" + flattenedTypes(typeNames))

//Generating json schemas from the flattened types

const generatedFilesBasePath = "./generated";

const settings: TJS.PartialArgs = {
	required: true
};

const compilerOptions: TJS.CompilerOptions = {
	strictNullChecks: true,
};

if (!existsSync(generatedFilesBasePath)) {
	mkdir(generatedFilesBasePath, (err) => {
		if (err) {
			throw new Error("Error creating " + generatedFilesBasePath + ":");
		}
	});
}
console.log(generatedFilesBasePath + " path verified.");

const flattenedFileTarget = "flattenedTypes.ts"

const program = TJS.getProgramFromFiles([resolve(flattenedPath + "/" + flattenedFileTarget)], compilerOptions);

console.log("TJS program initialized.");

const generator = TJS.buildGenerator(program, settings);

console.log("TJS schema generator initialized");

if (generator == null) {
	throw new Error("Error creating TJS generator for program " + flattenedPath + "/" + flattenedFileTarget);
}

const schemas = Object.fromEntries(typeNames.map((type) => "Flattened" + type).map((flattenedTypeName) => {
	console.log("Successfully translated " + flattenedTypeName + " schema.")
	return ([
		flattenedTypeName,
		TJS.generateSchema(program!, flattenedTypeName, settings, [], generator)
	]);
}));



Object.keys(schemas).forEach((schemaName) => {
	writeFile(
		generatedFilesBasePath + "/" + schemaName.replace("Flattened", "") + ".json", 
		JSON.stringify(schemas[schemaName], null, 4),
		() => {
			console.log("Successfully generated " + schemaName.replace("Flattened", "") + " schema.")
		}
	);
})


