import * as types from '../types'

const initial={
    loading: true
}

export const generalReducer=(state={...initial}, {type})=>{
    switch (type){
        case types.LOADING_TOGGLE:
            return {...state, loading: !state.loading}
        default:
            return state
    }
}


