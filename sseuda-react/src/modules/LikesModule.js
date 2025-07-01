import { createAction, handleActions } from "redux-actions";

const initialState = {
    likeList: [],
    like: null,
    userLike: null,
    userLikes: [],
    likeBanner: [],
    postLikeUp: null,
    deleteLikeDown: null,
};


export const GET_LIKE_LIST = 'like/GET_LIKE_LIST';
export const GET_LIKE = 'like/GET_LIKE';
export const GET_USER_LIKE = 'like/GET_USER_LIKE';
export const GET_USER_LIKE_LIST = 'like/GET_USER_LIKE_LIST';
export const GET_LIKE_BANNER = 'like/GET_LIKE_BANNER';
export const POST_LIKE_UP = 'like/POST_LIKE_UP';
export const DELETE_LIKE_DOWN = 'like/DELETE_LIKE_DOWN';

const actions = createAction({
    [GET_LIKE_LIST]: () => {},
    [GET_LIKE]: () => {},
    [GET_USER_LIKE]: () => {},
    [GET_USER_LIKE_LIST]: () => {},
    [GET_LIKE_BANNER]: () => {},
    [POST_LIKE_UP]: () => {},
    [DELETE_LIKE_DOWN]: () => {}
})

const likesReducer = handleActions({
    [GET_LIKE_LIST]: (state, { payload }) => ({
        ...state,
        likeList: payload,
    }),
    [GET_LIKE]: (state, { payload }) => ({
        ...state,
        like: payload,
    }),
    [GET_USER_LIKE]: (state, { payload }) => ({
        ...state,
        userLike: payload,
    }),
    [GET_USER_LIKE_LIST]: (state, { payload }) => ({
        ...state,
        userLikes: payload,
    }),
    [GET_LIKE_BANNER]: (state, { payload }) => ({
        ...state,
        likeBanner: payload,
    }),
    [POST_LIKE_UP]: (state, { payload }) => ({
        ...state,
        postLikeUp: payload,
    }),
    [DELETE_LIKE_DOWN]: (state, { payload }) => ({
        ...state,
        deleteLikeDown: payload,
    }),
}, initialState);


export default likesReducer;