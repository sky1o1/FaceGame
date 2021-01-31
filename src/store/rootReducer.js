import profile from './profile';
import auth from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    profile,
    authenticate: auth,
})

export default rootReducer;