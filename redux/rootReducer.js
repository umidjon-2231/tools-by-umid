import { combineReducers } from 'redux'
import {linkSaveReducer} from './reducers/linkSave.reducer'
import {generalReducer} from "./reducers/general.reducer";



const reducers = {
    linkSave: linkSaveReducer,
    general: generalReducer,
}

export default combineReducers(reducers)
