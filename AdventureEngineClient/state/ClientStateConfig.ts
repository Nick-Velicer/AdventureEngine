import { useQuery, type UseQueryReturn } from '@pinia/colada'
import { getCharacterbyId } from '../services/generated/CharacterService'
import type { Character } from '../types/appTypes/appTypes'

//This needs to be wrapped in a function context to prevent Pinia interactions
//before it is initialized by the app, this also lets some DI happen just in case we need
//alternate service handlers for testing or migrating implementations

type ServiceInterface<T> = {
    getAllItems: () => Promise<T>
    getItemById: (id: number) => Promise<T>
    saveItem: (item: T) => Promise<T>
}

export function composeStateConfig<
    //Type templating
    QueryHandlerType extends <T>(opts: {
        key: string[] | ((...args : any[]) => string[]), 
        query: (...args : any[]) => Promise<T>
    }) => UseQueryReturn<T>
>(
    //Arguments/dependencies
    queryHandler: QueryHandlerType, 
    characterService: ServiceInterface<Character>
) {

    type StoreShape = typeof stateDefault

    const stateDefault = {
        characterContext: queryHandler({
            key: ['character'],
            query: () => characterService.getItemById(1),
        }),
        count: 0
    }

    const stateGetters = {
        doubleCount: (state) => state.count * 2,
    } satisfies Record<string, (arg0: StoreShape) => any>


    const stateActions = {
        increment: () => {
            this.count++
        }

    } satisfies Record<string, (arg0: StoreShape) => void>

    //const actionsWithInjectedThisContext = Object.keys(stateActions).map(actionName => stateActions[actionName](this))

    return {
        default: stateDefault,
        getters: stateGetters,
        actions: stateActions
    }
}
