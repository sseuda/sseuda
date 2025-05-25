import { combineReducers } from 'redux';
import postReducer from './PostModule';

const rootReducer = combineReducers({
    postReducer
})

export default rootReducer;