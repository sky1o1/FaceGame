import profile from './profile';
import auth from './auth';
import emoji from './emoji';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    profile,
    authenticate: auth,
    emoji
})

export default rootReducer;