import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';
import reportsReducer from './ReportsModule';
import commentReducer from './CommentModule';
import alarmReducer from './AlarmModule';
import likesReducer from './LikesModule';
import userRoleReducer from './UserRoleModule';
import userSliceReducer from './userSlice';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer,
    reportsReducer,
    commentReducer,
    alarmReducer,
    likesReducer,
    userRoleReducer,
    user: userSliceReducer,
})

export default rootReducer;