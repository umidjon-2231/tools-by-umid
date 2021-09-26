import * as types from "../types";


const initial={
    modal: false
}

export const linkSaveReducer= (state = {...initial}, { type }) => {
    switch (type) {
        case types.MODAL_TOGGLE:
            return {...state ,modal: !state.modal}
        default:
            return state
    }
}