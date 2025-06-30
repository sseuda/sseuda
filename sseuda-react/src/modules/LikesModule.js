import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_LIKE_LIST = 'like/GET_LIKE_LIST';
export const GET_LIKE = 'like/GET_LIKE';
export const GET_USER_LIKE_LIST = 'like/GET_USER_LIKE_LIST';
export const GET_LIKE_BANNER = 'like/GET_LIKE_BANNER';
export const POST_LIKE_UP = 'like/POST_LIKE_UP';
export const DELETE_LIKE_DOWN = 'like/DELETE_LIKE_DOWN';

const actions = createAction({
    [GET_LIKE_LIST]: () => {},
    [GET_LIKE]: () => {},
    [GET_USER_LIKE_LIST]: () => {},
    [GET_LIKE_BANNER]: () => {},
    [POST_LIKE_UP]: () => {},
    [DELETE_LIKE_DOWN]: () => {}
})

const likesReducer = handleActions({
    [GET_LIKE_LIST]: (state, {payload}) =>{
        return payload
    },
    [GET_LIKE]: (state, {payload}) =>{
        return payload
    },
    [GET_USER_LIKE_LIST]: (state, {payload}) =>{
        return payload
    },
    [GET_LIKE_BANNER]: (state, {payload}) =>{
        return payload
    },
    [POST_LIKE_UP]: (state, {payload}) =>{
        return payload
    },
    [DELETE_LIKE_DOWN]: (state, {payload}) =>{
        return payload
    }
}, initialState);

export default likesReducer;