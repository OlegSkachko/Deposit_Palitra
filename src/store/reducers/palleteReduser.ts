import PaletteElement, { ActionTypes, PaletteNewElement } from "../../types/types"


const initialState: PaletteElement[] = [{
    id: 2022,
    color: 'white',
}]



export const palleteReducer = (state = initialState, action: PaletteNewElement):PaletteElement[] => {
    switch(action.type) {
        case ActionTypes.ADD_PALLETE: 
            return [...state, action.payload]
        case ActionTypes.DELETE_PALLETE: 
            let newPallete = state.filter((el)=> action.payload.id !== el.id)
            return newPallete
        case ActionTypes.CHANGE_PALLETE_COLOR: 
            let changedPallete = state.map((el)=> {
                if(action.payload.id === el.id) {
                    return {id: el.id, color: action.payload.color}
                }
                return el
            })
            return changedPallete
        default: 
            return state
    }
}