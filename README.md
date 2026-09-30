
## Table of Contents
- [About](#about)
- [Current In-Work Items](#current-in-work-items)
- [Development Setup](#development-setup)
- [License](#license)

## About

**Adventure Engine** is a lightweight environment for fully-fledged Dungeons and Dragons 5e book-keeping, with the following highlights:

- **Domain-Driven Quantifiers**: A rather hand-wavey title which means _every aspect of the game_ is tracked and applied in a quantitative, manageable way. Modifier dependencies, static class effects, spell effects, item effects, _all of it_ is processable and templated onto the app's syntactic nodes.

- **Self-Hostable\***: Containerization pending further development, with functionality owned by **your** local environment and _nothing else_. No accounts, no paywalls, no content restrictions, the only limit is your creativity.

- **Free and Open Source**: Available for anybody to fork/modify/upgrade, provided further development upholds GPL 3.0 copyleft principles (for more info, see [License](#license)).

## Current In-Work Items

- **Ongoing Game Element Templating**: Distilling existing class progressions, items, groupings, and misc. game effects to be templated across the application domain and quantifier tree structure (effectively going from natural language descriptions to an abstract syntax tree).

- **Calculation Roll-up Interfaces**: The standard free text DND Character Sheet relies on tracking a set of derived stateful values by hand, we need these core calculations to discern the standard picture of character state and inform the actual data requirements of the character management UI.

- **Game Transaction API**: Current types and structures are set to serve general scheme iteration and game templating tests. A way to safely engage with the game evaluation restrictions set by the templating is needed to both guardrail valid game actions and prevent game state from falling out of an expected configuration. 

## Development Setup

**Environment Prerequisites:** Python 3.8+, Golang 25+, Deno 2.3+

```shell
# Ensure Git is installed
# Visit https://git-scm.com to download and install Git if not already installed

# 1. From a Git-accessible environment, clone the repository.
git clone https://github.com/Nick-Velicer/AdventureEngine.git

# 2. Frontend setup and launch (starting in project root)
cd AdventureEngineClient/vueApp
deno install

# 3. Populate generated migrations (starting in project root)
cd AdventureEngineServer
source migrationVenv/bin/activate # or equivalent script invocation
pip install migrationRequirements.txt
python3 regenerateMigrations.py # or equivalent python invocation

# 4. Backend setup and launch (from project root)
cd AdventureEngineServer
go build
./adventureengineserver -regenerate # this flag is only needed for initial population or a full database teardown/rebuild
```

## License

This product is distributed under the GNU General Public License v3.0. As software licenses are rather boring to read, the short of it is:

**This software is free and open source, use it however you want! BUT derivative software must also remain free and open source under GPL3.**

For more information search for GPL/copyleft/FOSS, or read the license if you're a masochist.



[Back to top](#top)