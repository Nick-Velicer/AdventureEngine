import os
import subprocess
import sys

def main():
    baseDir = "theme/"
    targetDir = baseDir + "generated/"
    variablesFile = targetDir + "variables.css"

    if not os.path.exists(targetDir):
        os.makedirs(targetDir)

    with open(variablesFile, "w") as outfile:
        try:
            #Part of this is done on the typescript side to allow for the base configuration of the generation to be referenceable as a TS type
            subprocess.run(["deno", "run",  "--allow-env", "--allow-read", "--allow-write", "themeConfig.ts"], cwd=os.fsencode(baseDir), shell=True, stdout=outfile)
            print("Frontend theme utilities successfully generated.")
        except Exception as e:
            print(e)
            sys.exit(1)
        
        outfile.close()


            


if __name__ == '__main__': main()