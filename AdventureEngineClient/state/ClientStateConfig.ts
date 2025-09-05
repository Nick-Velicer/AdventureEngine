export type StoreShape = typeof stateDefault


export const stateDefault = {
    activeCharacterId: undefined as number | undefined,
    count: 0
}

export const stateGetters = {
    doubleCount: (state) => state.count * 2,
} satisfies Record<string, (arg0: StoreShape) => any>


export const stateActions = {
    increment: () => {
        this.count++
    }

} satisfies Record<string, (arg0: StoreShape) => void>
