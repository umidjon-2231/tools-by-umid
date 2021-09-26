import { combineReducers } from 'redux'
import {linkSaveReducer} from './reducers/linkSave.reducer'


const reducers = {
    linkSave: linkSaveReducer,
}

export default combineReducers(reducers)
