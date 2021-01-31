import { createAction, handleAction } from 'redux-actions';

export const setAuth = createAction('SET_AUTH');

const INITIAL_VALUES = {
    isAuthenticated: false,
}

const authReducer = handleAction(
    'SET_AUTH',
    (state, action) =>{
        return {
            ...state,
                isAuthenticated: action.payload,
        }
    },
    INITIAL_VALUES
)

export default authReducer;