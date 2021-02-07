import { createAction, handleActions } from 'redux-actions';

export const setProfile = createAction('SET_PROFILE');
export const setUsername = createAction('SET_USERNAME');
export const setEmail = createAction('SET_EMAIL');
export const setHighScore = createAction('SET_HIGH_SCORE');
export const setScores = createAction('SET_SCORE');

const INITIAL_STATE = { 
    username: '',
    email: '',
    highScore: 0,
    score: 0,
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
    'SET_HIGH_SCORE':
    (state, action) => ({
        ...state,
        highScore : action.payload
    }),
    'SET_SCORE':
    (state, action) => ({
        ...state,
        score : action.payload
    })
},
    INITIAL_STATE
  );

  export default profileReducer;
  