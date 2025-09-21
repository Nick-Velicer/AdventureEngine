import  { testDarkTheme, themeDefault, type ThemeVariables } from '../theme/themeConfig'
import { AppTypes } from '../types/appTypes/appTypes'

export type StoreShape = typeof stateDefault


export const stateDefault = {
    activeCharacterId: undefined as number | undefined,
    activeTableView: undefined as (keyof typeof AppTypes) | undefined,
    theme: themeDefault as Record<ThemeVariables, string>,
    count: 0
}

export const stateGetters = {
    doubleCount: (state) => state.count * 2,
    reactiveThemeElement: (state) => (themeElement: ThemeVariables) => state.theme[themeElement]

} satisfies Record<string, (arg0: StoreShape) => any>


export const stateActions = {
    increment() {
        this.count++
    },
    setTheme(variant: "Light" | "Dark") {
        this.theme = variant === "Light"? themeDefault : testDarkTheme
    },
    setActiveTableView(table: keyof typeof AppTypes) {
        this.activeTableView = table;
    }
}
//} satisfies Record<string, (arg0: StoreShape) => void>
