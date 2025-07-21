import os
import re
import pprint


baseTypeDir = "./generated"

goToSqlTypeConversions = {
    "string": "TEXT",
    "*string": "TEXT",
    "bool": "NUMBER",
    "*bool": "NUMBER",
    "*float64": "REAL",
    "float64" : "REAL"
}

def main():
    directory = os.fsencode(baseTypeDir)

    createStatements = []

    for file in os.listdir(directory):
        filename = os.fsdecode(file)

        if filename.endswith(".go"): 
            tableName = filename.replace(".go", "").replace("Flattened", "")
            typeMeta = {}

            try:
                typeMeta = produceParsedType(baseTypeDir + "/" + filename)

            except Exception as e:
                raise e
            
            createStatements.append(produceCreateTableStatement(tableName, typeMeta))
            continue

        else:
            continue 
    
    f = open("testMigration.sql", "w")
    f.writelines([i + "\n" for i in createStatements])
    f.close()


def produceParsedType(fileName: str):
    fileContent = ""

    try:
        with open(fileName, 'r', encoding='utf-8') as file:
            fileContent = file.read()

    except FileNotFoundError:
        raise FileNotFoundError("Error: The file " + fileName + " was not found.")
    
    except Exception as e:
        raise e

    if (fileContent == ""):
        raise Exception("Unexpected: could not recieve file content from " + fileName)

    #Isolating the main key/value content
    fileContent = fileContent.split("{", 1)[1].split("}", 1)[0]

    #Removing comment lines
    fileContent = re.sub('//(.+)\n', '', fileContent)

    #Removing any additional JSON annotation wrapped like `some annotation`
    #fileContent = re.sub('`[^`]+`', '', fileContent)

    #Trimming newlines and tabs, and isolating field names and types to their own cleaned dictionary
    fileContent = re.sub('\n\n', '\n', fileContent)
    fileContent = re.sub('\t', '', fileContent)

    fileContent = fileContent.split("\n")
    fileContent = [i.strip() for i in fileContent if i != ""]
    fileContent = [i.split(" ", 1) for i in fileContent]

    fieldTypes = {
        "attributes": {}, 
        "relationships": {}
    }

    #Checking for relationship-specific delimiters to know which fields are foreign keys
    #and removing the `json annotation` containing said delimiter afterwards
    for field in fileContent:
        if ( "__" not in field[1]):
            fieldTypes["attributes"][field[0]] = re.sub('`[^`]+`', '', field[1]).strip()
        else:
            fieldTypes["relationships"][field[0]] = {
                field[0]: re.sub('`[^`]+`', '', field[1]).strip(),
                "correspondingTable": re.findall(r'(\w*%s\w*)' % "__", field[1])[0].split("__")[1]
            }

    #resulting dict structure for a type/table:
    #{
    #   "attributes": {
    #       "field": "type"
    #   }
    #
    #   "relationships": {
    #       "field": {
    #           "field": "type"
    #           "correspondingTable": "tableName"
    #       }
    #   }
    #}

    return fieldTypes


#This expects a dictionary in the return shape specified for produceParsedTypes
def produceCreateTableStatement(tableName: str, typeMeta: dict):

    def generateForeignKeyConstraintSnippet(columnName: str, targetTable: str):
        #The id name is currently locked as "Id" from generation further up
        return "CONSTRAINT fk_" + targetTable + " FOREIGN KEY (" + columnName + ") REFERENCES " + targetTable + "(Id)"
    
    createTableStatement = "CREATE TABLE [IF NOT EXISTS] " + tableName + "(Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT"
    
    additionalCreateSnippets = []

    for attribute in list(typeMeta["attributes"].keys()):
        additionalCreateSnippets.append(attribute + " " + goToSqlTypeConversions[typeMeta["attributes"][attribute]])

    for relationship in list(typeMeta["relationships"].keys()):
        additionalCreateSnippets.append(generateForeignKeyConstraintSnippet(relationship, typeMeta["relationships"][relationship]["correspondingTable"]))

    for snippet in additionalCreateSnippets:
        createTableStatement = createTableStatement + ", " + snippet

    return createTableStatement + ");"

    



if __name__ == "__main__": main()