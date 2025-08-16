import os
import subprocess
import sys

def main():
    baseDir = os.fsencode("types")
    try:
        subprocess.run(["deno", "run",  "--allow-env", "--allow-read", "--allow-write", "generateTypes.ts"], cwd=baseDir, shell=True)

    except Exception as e:
        print(e)
        sys.exit(1)


if __name__ == '__main__': main()