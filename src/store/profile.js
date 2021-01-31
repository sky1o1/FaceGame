import { createAction, handleActions } from 'redux-actions';

export const setProfile = createAction('SET_PROFILE');
export const setUsername = createAction('SET_USERNAME');
export const setEmail = createAction('SET_EMAIL');
export const setPassword = createAction('SET_PASSWORD');
export const setImage = createAction('SET_IMAGE');

const INITIAL_STATE = { 
    username: '',
    email: '',
    password: '',
    image: '',
}; 

const profileReducer = handleActions(
    {
    'SET_PROFILE':
    (state, action) => {
        return {...action.payload}
    } ,
    'SET_USERNAME':
    (state, action) => ({
        ...state,
        username : action.payload
    }),
    'SET_EMAIL':
    (state, action) => ({
        ...state,
        email : action.payload
    }),
    'SET_PASSWORD':
    (state, action) => {
        console.log('action,', action.payload)
        return {...state, 
        password: action.payload}
    } ,
    'SET_IMAGE':
    (state, action) => ({
        ...state,
        image : action.payload
    })
},
    INITIAL_STATE
  );

  export default profileReducer;
  