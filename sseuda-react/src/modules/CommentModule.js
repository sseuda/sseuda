import { createActions, handleActions } from "redux-actions";

const initialState =[];

export const GET_COMMENTS = 'comment/GET_COMMENTS';                 // 게시글별 댓글 전체 조회
export const POST_USER_COMMENT = 'comment/POST_USER_COMMENT';       // 게시글별 특정 회원 댓글 등록
export const PUT_USER_COMMENT = 'comment/PUT_USER_COMMENT';         // 게시글별 특정 회원 댓글 수정
export const DELETE_USER_COMMENT = 'comment/DELETE_USER_COMMENT';   // 게시글별 특정 회원 댓글 삭제

const actions = createActions({
    [GET_COMMENTS]: () => {},
    [POST_USER_COMMENT]: () => {},
    [PUT_USER_COMMENT]: () => {},
    [DELETE_USER_COMMENT]: () => {}
})

const commentReducer = handleActions({
    [GET_COMMENTS]: (state, {payload}) =>{
        return payload
    },
    [POST_USER_COMMENT]: (state, {payload}) =>{
        return payload
    },
    [PUT_USER_COMMENT]: (state, {payload}) =>{
        return payload
    },
    [DELETE_USER_COMMENT]: (state, {payload}) =>{
        return payload
    },
}, initialState);

export default commentReducer;