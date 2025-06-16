import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';
import reportsReducer from './ReportsModule';
import commentReducer from './CommentModule';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer,
    reportsReducer,
    commentReducer
})

export default rootReducer;