import re
import pprint

goToSqlTypeConversions = {
    'string': 'TEXT',
    '*string': 'TEXT',
    'bool': 'NUMBER',
    '*bool': 'NUMBER',
    '*float64': 'REAL',
    'float64' : 'REAL',
    '*time.Time': 'TEXT',
}

def reformatRelationshipName(relationshipName: str, correspondingTable: str):
        relationshipName = relationshipName[0].upper() + relationshipName[1:]
        return relationshipName[:relationshipName.rfind(correspondingTable)] + '__' + correspondingTable

def produceParsedType(fileName: str):
    fileContent = ''

    try:
        with open(fileName, 'r', encoding='utf-8') as file:
            fileContent = file.read()

    except FileNotFoundError:
        raise FileNotFoundError('Error: The file ' + fileName + ' was not found.')
    
    except Exception as e:
        raise e
    
    if (fileContent == ''):
        raise Exception('Unexpected: could not recieve file content from ' + fileName)

    #Isolating the main key/value content
    fileContent = fileContent.split('{', 1)[1].split('}', 1)[0]

    #Removing comment lines
    fileContent = re.sub('//(.+)\n', '', fileContent)

    #Removing any additional JSON annotation wrapped like `some annotation`
    #fileContent = re.sub('`[^`]+`', '', fileContent)

    #Trimming newlines and tabs, and isolating field names and types to their own cleaned dictionary
    fileContent = re.sub('\n\n', '\n', fileContent)
    fileContent = re.sub('\t', '', fileContent)

    fileContent = fileContent.split('\n')
    fileContent = [i.strip() for i in fileContent if i != '']
    fileContent = [i.split(' ', 1) for i in fileContent]

    fieldTypes = {
        'attributes': {}, 
        'relationships': {
            'manyToOne': {},
            'oneToMany': {}
        }
    }

    #Checking for relationship-specific delimiters to know which fields are foreign keys
    #and removing the `json annotation` containing said delimiter afterwards
    for field in fileContent:
        if ( '__' not in field[1]):
            fieldTypes['attributes'][field[0]] = {'type': re.sub('`[^`]+`', '', field[1]).strip()}
        else:
            correspondingTypeText: str = re.sub('`[^`]+`', '', field[1]).strip()
            correspondingTableText: str = re.findall(r'(\w*%s\w*)' % '__', field[1])[0].split('__')[1]

            #There's not a convenient way to do this any more inline, .capitalize() lowercases all the other characters
            capitalizedTableName: str = correspondingTableText[0].upper() + correspondingTableText[1:]
            formattedRelationshipName: str = reformatRelationshipName(field[0], capitalizedTableName)

            if ('[]' in field[1]):
                fieldTypes['relationships']['oneToMany'][formattedRelationshipName] = {
                    'type': correspondingTypeText,
                    'correspondingTable': capitalizedTableName
                }
            else:
                fieldTypes['relationships']['manyToOne'][formattedRelationshipName] = {
                    'type': correspondingTypeText,
                    'correspondingTable': capitalizedTableName
                }

    #resulting dict structure for a type/table:
    #{
    #   'attributes': {
    #       'field': {
    #           'type': 'type'
    #       }
    #   }
    #
    #   'relationships': {
    #       'oneToMany': {
    #           'field': {
    #             'type': 'type'
    #             'correspondingTable': 'tableName'
    #            }
    #       }
    #       'manyToOne': {
    #           'field': {
    #             'type': 'type'
    #             'correspondingTable': 'tableName'
    #            }
    #       }
    #       
    #   }
    #}
    return fieldTypes


def produceDatabaseTargetType(baseFileName: str, typeMeta: list):

    #For now, outputting a new file without the JSON in the name for the db-compatible type
    #Any additional transformations for the database interfaces can be intialized here
    fileContent = ''

    try:
        with open(baseFileName, 'r', encoding='utf-8') as file:
            fileContent = file.read()

    except FileNotFoundError:
        raise FileNotFoundError('Error: The file ' + baseFileName + ' was not found.')
    
    except Exception as e:
        raise e

    if (fileContent == ''):
        raise Exception('Unexpected: could not recieve file content from ' + baseFileName)
    
    #Removing any one-to-many arrays
    fileContent = "\n".join([line for line in fileContent.split("\n") if not ('[]' in line)])
    
    #Splicing in "__" to relationship names, which gets removed in the Typescript -> Go translation process

    replacedTables = []
    for relationship in typeMeta["relationships"]["manyToOne"].keys():

        correspondingTable = typeMeta["relationships"]["manyToOne"][relationship]["correspondingTable"]

        #preventing over-replacing of tablenames (adds extra "__")
        if (correspondingTable in replacedTables):
            continue

        replacedTables.append(correspondingTable)
        
        #slightly cheating here to only reference the ending table instance in a relationship name
        #which gets around things like CampaignCampaign being turned into __Campaign__Campaign
        fileContent = fileContent.replace(correspondingTable + " *float64", "__" + correspondingTable + " *int")

    return fileContent.replace("Json", "").replace("goTypeBase", "generatedDatabaseTypes").replace('yaml:"', 'gorm:"column:').replace(",omitempty", "").replace("column:Id", "primaryKey;column:Id").replace("Id *float64", "Id *int")

