export const ADD_PALLETE = 'ADD_PALLETE' 
export const CHANGE_PALLETE_COLOR = 'CHANGE_PALLETE_COLOR' 

export enum ActionTypes {
    ADD_PALLETE = 'ADD_PALLETE',
    DELETE_PALLETE = 'DELETE_PALLETE',
    CHANGE_PALLETE_COLOR = 'CHANGE_PALLETE_COLOR' 
}

export default interface PaletteElement {
    id: number;
    color?: string;
}

export interface PaletteNewElement {
    payload: PaletteElement;
    type: ActionTypes 
}
