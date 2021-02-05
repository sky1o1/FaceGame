import { createAction, handleActions } from 'redux-actions';

export const setHappyFace = createAction('SET_HAPPY_FACE');
export const setAngryFace = createAction('SET_ANGRY_FACE');
export const setSadFace = createAction('SET_SAD_FACE');
export const setSurprisedFace = createAction('SET_SURPRISED_FACE');

const INITIAL_STATE = { 
    happyFace: false,
    angryFace: false,
    sadFace: false,
    surprisedFace: false,
}; 

const emojiReducer = handleActions(
    {
    'SET_HAPPY_FACE':
    (state, action) => ({
        ...state,
        happyFace : action.payload
    }),
    'SET_ANGRY_FACE':
    (state, action) => ({
        ...state,
        angryFace : action.payload
    }),
    'SET_SAD_FACE':
    (state, action) => ({
        ...state,
        sadFace : action.payload
    }),
    'SET_SURPRISED_FACE':
    (state, action) => ({
        ...state,
        surprisedFace : action.payload
    })
},
    INITIAL_STATE
  );

  export default emojiReducer;
  