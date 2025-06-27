import { createActions, handleAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_CATEGORY = 'category/GET_CATEGORY';                    //  카테고리 전체 조회
export const GET_BIG_CATEGORY = 'category/GET_BIG_CATEGORY';                    //  카테고리 전체 조회

export const POST_BIG_CATEGORY = 'category/POST_BIG_CATEGORY';           //  상위 카테고리 등록
export const POST_SMALL_CATEGORY = 'category/POST_SMALL_CATEGORY';      //  하위 카테고리 등록

export const PUT_BIG_CATEGORY = 'category/PUT_BIG_CATEGORY';      //  상위 카테고리 수정
export const PUT_SMALL_CATEGORY = 'category/PUT_SMALL_CATEGORY';  //  하위 카테고리 수정

export const DELETE_CATEGORY = 'category/DELETE_CATEGORY';              //  카테고리 전체 삭제
export const DELETE_SMALL_CATEGORY = 'category/DELETE_SMALL_CATEGORY';  //  하위 카테고리 삭제

const actions = createActions({
    [GET_CATEGORY]: () => {},
    [GET_BIG_CATEGORY]: () => {},
    [POST_BIG_CATEGORY]: () => {},
    [POST_SMALL_CATEGORY]: () => {},
    [PUT_BIG_CATEGORY]: () => {},
    [PUT_SMALL_CATEGORY]: () => {},
    [DELETE_CATEGORY]: () => {},
    [DELETE_SMALL_CATEGORY]: () => {},
})

const categoryReducer = handleActions({
    [GET_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [GET_BIG_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [POST_BIG_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [POST_SMALL_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [PUT_BIG_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [PUT_SMALL_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [DELETE_CATEGORY]: (state, {payload}) => {
        return payload
    },
    [DELETE_SMALL_CATEGORY]: (state, {payload}) => {
        return payload
    },
}, initialState);

export default categoryReducer;