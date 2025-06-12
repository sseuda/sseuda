import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer
})

export default rootReducer;