import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';
import reportsReducer from './ReportsModule';
import commentReducer from './CommentModule';
import alarmReducer from './AlarmModule';
import likesReducer from './LikesModule';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer,
    reportsReducer,
    commentReducer,
    alarmReducer,
    likesReducer
})

export default rootReducer;