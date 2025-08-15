import { useQuery } from '@pinia/colada'
import { getCharacterbyId } from '../services/generated/CharacterService'

//Separated typed values and actions for some generic store to be coupled to a context externally
//If needed, this can be broken out to smaller store slices and composed, or be kept as separate configs/stores

type StoreShape = typeof stateDefault

export const stateDefault = {
    character: useQuery({
  	    key: () => ['characters'],
  	    query: () => getCharacterbyId(1),
    }),

}

export const computedGetters = {

} satisfies Record<string, (arg0: StoreShape) => any>


const stateActions = {
    increment: (store) => {
        store.characters
    }
} satisfies Record<string, (arg0: StoreShape) => void>

export const actionsWithInjectedThisContext = Object.keys(stateActions).map(actionName => stateActions[actionName](this))