import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_POSTS = 'post/GET_POSTS';                               //  게시글 전체 조회
export const GET_CATEGORY_POST = 'post/GET_CATEGORY_POST' ;              //  카테고리별 게시글 조회
export const GET_USER_POSTS = 'post/GET_USER_POSTS';                     //  회원별 게시글 전체 조회
export const GET_USER_CATEGORY_POSTS = 'post/GET_USER_CATEGORY_POSTS';   //  회원 카테고리별 게시글 전체 조회

export const POST_USER_POSTING = 'post/POST_USER_POSTING';               //  회원별 게시글 등록
export const DELETE_USER_POST = 'post/DELETE_USER_POST' ;                //  회원별 게시글 삭제

const actions = createActions({
    [GET_POSTS]: () => {},
    [GET_CATEGORY_POST]: () =>{},
    [GET_USER_POSTS]: () =>{},
    [GET_USER_CATEGORY_POSTS]: () =>{},
    [POST_USER_POSTING]: () =>{},
    [DELETE_USER_POST]: () =>{},
})

const postReducer = handleActions({
    [GET_POSTS]: (state, {payLoad}) => {
        return payLoad
    },
    [GET_CATEGORY_POST]: (state, {payLoad}) => {
        return payLoad
    },
    [GET_USER_POSTS]: (state, {payLoad}) => {
        return payLoad
    },
    [GET_USER_CATEGORY_POSTS]: (state, {payLoad}) => {
        return payLoad
    },
    [POST_USER_POSTING]: (state, {payLoad}) => {
        return payLoad
    },
    [DELETE_USER_POST]: (state, {payLoad}) => {
        return payLoad
    },
}, initialState);

export default postReducer;