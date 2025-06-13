import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';
import commentReducer from './CommentModule';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer,
    commentReducer
})

export default rootReducer;