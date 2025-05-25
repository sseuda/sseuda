import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    postReducer,
    memberReducer
})

export default rootReducer;