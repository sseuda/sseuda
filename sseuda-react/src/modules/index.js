import { combineReducers } from 'redux';
import postReducer from './PostModule';
import memberReducer from './MemberModule';
import categoryReducer from './CategoryModule';
import reportsReducer from './ReportsModule';

const rootReducer = combineReducers({
    postReducer,
    categoryReducer,
    memberReducer,
    reportsReducer
})

export default rootReducer;