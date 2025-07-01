import { createActions, handleActions } from "redux-actions";

const initialState = {
    categoryList: [],       // 전체 카테고리 (대+소 분류)
    bigCategoryList: []     // 대분류만
};

// 액션 타입 상수
export const GET_CATEGORY = 'category/GET_CATEGORY';                    
export const GET_BIG_CATEGORY = 'category/GET_BIG_CATEGORY';                    

export const POST_BIG_CATEGORY = 'category/POST_BIG_CATEGORY';           
export const POST_SMALL_CATEGORY = 'category/POST_SMALL_CATEGORY';      

export const PUT_BIG_CATEGORY = 'category/PUT_BIG_CATEGORY';      
export const PUT_SMALL_CATEGORY = 'category/PUT_SMALL_CATEGORY';  

export const DELETE_CATEGORY = 'category/DELETE_CATEGORY';              
export const DELETE_SMALL_CATEGORY = 'category/DELETE_SMALL_CATEGORY';  

// 액션 생성
const actions = createActions({
    [GET_CATEGORY]: () => {},
    [GET_BIG_CATEGORY]: () => {},
    [POST_BIG_CATEGORY]: () => {},
    [POST_SMALL_CATEGORY]: () => {},
    [PUT_BIG_CATEGORY]: () => {},
    [PUT_SMALL_CATEGORY]: () => {},
    [DELETE_CATEGORY]: () => {},
    [DELETE_SMALL_CATEGORY]: () => {},
});

// 리듀서
const categoryReducer = handleActions({
    // 전체 카테고리 조회
    [GET_CATEGORY]: (state, { payload }) => ({
        ...state,
        categoryList: payload
    }),

    // 대분류 카테고리 조회
    [GET_BIG_CATEGORY]: (state, { payload }) => ({
        ...state,
        bigCategoryList: payload
    }),

    // 상위 카테고리 등록 (리스트에 append)
    [POST_BIG_CATEGORY]: (state, { payload }) => ({
        ...state,
        bigCategoryList: [...state.bigCategoryList, payload.data]
    }),

    // 하위 카테고리 등록 (필요시 categoryList에 추가)
    [POST_SMALL_CATEGORY]: (state, { payload }) => ({
        ...state,
        categoryList: [...state.categoryList, payload.data]
    }),

    // 상위 카테고리 수정 (리스트 내 해당 항목 업데이트)
    [PUT_BIG_CATEGORY]: (state, { payload }) => ({
        ...state,
        bigCategoryList: state.bigCategoryList.map((category) =>
            category.id === payload.data.id ? payload.data : category
        )
    }),

    // 하위 카테고리 수정
    [PUT_SMALL_CATEGORY]: (state, { payload }) => ({
        ...state,
        categoryList: state.categoryList.map((category) =>
            category.id === payload.data.id ? payload.data : category
        )
    }),

    // 상위 카테고리 삭제
    [DELETE_CATEGORY]: (state, { payload }) => ({
        ...state,
        bigCategoryList: state.bigCategoryList.filter(
            (category) => category.id !== payload.data.id
        )
    }),

    // 하위 카테고리 삭제
    [DELETE_SMALL_CATEGORY]: (state, { payload }) => ({
        ...state,
        categoryList: state.categoryList.filter(
            (category) => category.id !== payload.data.id
        )
    }),

}, initialState);

export default categoryReducer;
