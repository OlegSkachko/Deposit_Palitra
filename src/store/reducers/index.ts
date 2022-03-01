import { combineReducers } from "redux";
import { palleteReducer } from "./palleteReduser";


export const rootReducer = combineReducers({
    pallete: palleteReducer,
})

export type RootState = ReturnType<typeof rootReducer>
