import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_POSTS = 'post/GET_POSTS';                               //  게시글 전체 조회
export const GET_POST = 'post/GET_POST';
export const GET_CATEGORY_POST = 'post/GET_CATEGORY_POST' ;              //  카테고리별 게시글 조회
export const GET_USER_POSTS = 'post/GET_USER_POSTS';                     //  회원별 게시글 전체 조회
export const GET_USER_CATEGORY_POSTS = 'post/GET_USER_CATEGORY_POSTS';   //  회원 카테고리별 게시글 전체 조회
export const GET_SEARCH_POSTS = 'post/GET_SEARCH_POSTS';                 //  검색

export const POST_USER_POSTING = 'post/POST_USER_POSTING';               //  회원별 게시글 등록
export const PUT_USER_POSTING = 'post/PUT_USER_POSTING';               //  회원별 게시글 등록
export const PUT_VIEW_COUNT = 'post/PUT_VIEW_COUNT';               //  회원별 게시글 등록
export const DELETE_USER_POST = 'post/DELETE_USER_POST' ;                //  회원별 게시글 삭제

const actions = createActions({
    [GET_POSTS]: () => {},
    [GET_POST]: () => {},
    [GET_CATEGORY_POST]: () => {},
    [GET_USER_POSTS]: () => {},
    [GET_USER_CATEGORY_POSTS]: () => {},
    [GET_SEARCH_POSTS]: () => {},
    [POST_USER_POSTING]: () =>{},
    [PUT_USER_POSTING]: () =>{},
    [PUT_VIEW_COUNT]: () =>{},
    [DELETE_USER_POST]: () =>{},
})

const postReducer = handleActions({
    [GET_POSTS]: (state, {payload}) => {
        return payload
    },
    [GET_POST]: (state, {payload}) => {
        return payload
    },
    [GET_CATEGORY_POST]: (state, {payload}) => {
        return payload
    },
    [GET_USER_POSTS]: (state, {payload}) => {
        return payload
    },
    [GET_USER_CATEGORY_POSTS]: (state, {payload}) => {
        return payload
    },
    [GET_SEARCH_POSTS]: (state, { payload }) => {
        return payload
    },
    [POST_USER_POSTING]: (state, {payload}) => {
        return payload
    },
    [PUT_USER_POSTING]: (state, {payload}) => {
        return payload
    },
    [PUT_VIEW_COUNT]: (state, {payload}) => {
        return payload
    },
    [DELETE_USER_POST]: (state, {payload}) => {
        return payload
    },
}, initialState);

export default postReducer;