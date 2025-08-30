import os
import subprocess
import sys


def main():
    
    try:
        subprocess.run(["python", "regenerateFrontendTypes.py"], cwd="AdventureEngineClient")
    except Exception as e:
        print(e)
        sys.exit(1)
    
    targetTypesPath = 'AdventureEngineServer/goTypeBase'

    directory = os.path.dirname(targetTypesPath)
    if not os.path.exists(directory):
        os.makedirs(directory)

    generatedJsonSchemaBase = "AdventureEngineClient/types/generated/"
    

    for file in os.listdir(generatedJsonSchemaBase):
        fileName = os.fsdecode(file)
        #For SOME reason this doesn't work through args with subprocess.run.
        #Since this is a tool call and not a system-specific syntax, this should
        #get invoked the same way for both cmd and unix, so it's staying this way 
        #until something better comes along.
        os.system("go-jsonschema AdventureEngineClient/types/generated/" + fileName + " -p goTypeBase --verbose --only-models > AdventureEngineServer/goTypeBase/" + fileName.replace(".json", ".go"))
    
    try:
        subprocess.run(["python", "regenerateFrontendServices.py"], cwd="AdventureEngineClient")
    except Exception as e:
        print(e)
        sys.exit(1)

    try:
        subprocess.run(["python", "regenerateBackend.py"], cwd="AdventureEngineServer")
    except Exception as e:
        print(e)
        sys.exit(1)
      

if __name__ == '__main__': main()