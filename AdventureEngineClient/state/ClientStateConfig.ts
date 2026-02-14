import  { testDarkTheme, themeDefault, type ThemeVariables } from '../theme/themeConfig'
import { AppTypes, type User, type DomainCharacterStat, type DomainDice } from '../types/appTypes/appTypes'

export type StoreShape = typeof stateDefault


export const stateDefault = {
    activeUser: undefined as User | undefined,
    sessionToken: undefined as string | undefined,
    activeCharacterId: undefined as number | undefined,
    activeTableView: undefined as (keyof typeof AppTypes) | undefined,
    theme: typeof localStorage.getItem("theme") === "string" ? JSON.parse(localStorage.getItem("theme")!): themeDefault as Record<ThemeVariables, string>,
    //Tables that realistically will not be changing, and are used often enough 
    //for UI organization that being able to access them synchronously makes life a lot easier
    staticTables: {
        DomainCharacterStat: undefined as Array<DomainCharacterStat> | undefined,
        DomainDice: undefined as Array<DomainDice> | undefined
    } satisfies Partial<Record<keyof typeof AppTypes, Array<typeof AppTypes[keyof typeof AppTypes]> | undefined>>
}

export const stateGetters = {
    reactiveThemeElement: (state) => (themeElement: ThemeVariables) => state.theme[themeElement],

} satisfies Record<string, (arg0: StoreShape) => any>


///Potentially at some point just generate the setters if there's enough that just directly set the value with no other logic
export const stateActions = {
    setTheme(variant: "Light" | "Dark") {
        this.theme = variant === "Light"? themeDefault : testDarkTheme;
        localStorage.setItem("theme", JSON.stringify(variant === "Light"? themeDefault : testDarkTheme));
    },
    setActiveTableView(table: keyof typeof AppTypes) {
        this.activeTableView = table;
    },
    setActiveCharacterId(id: number) {
        this.activeCharacterId = id;
    }, 
    initializeUserSession(user: User) {
        this.activeUser = user;
    }, 
    setSessionToken(token: string) {
        this.sessionToken = token;
    }, 
}
//} satisfies Record<string, (arg0: StoreShape) => void>
