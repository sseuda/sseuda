import { DELETE_CATEGORY, DELETE_SMALL_CATEGORY, GET_BIG_CATEGORY, GET_CATEGORY, POST_BIG_CATEGORY, POST_SMALL_CATEGORY, PUT_BIG_CATEGORY, PUT_SMALL_CATEGORY } from "../modules/CategoryModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;


//  카테고리 전체 조회
export const callCategoryApi = () =>{
    
    let requestURL = `${prefix}/category/post/userpage`;
    console.log('[CategoryApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[CategoryApiCalls] callCategoryApi RESULT : ', result);
            dispatch({type: GET_CATEGORY, payload: result.data});
        }
    };
};

//  상위 카테고리 전체 조회
export const callBigCategoryApi = () =>{
    
    let requestURL = `${prefix}/category/bigList`;
    console.log('[CategoryApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[CategoryApiCalls] callCategoryApi RESULT : ', result);
            dispatch({type: GET_BIG_CATEGORY, payload: result.data});
        }

    };
};


//  상위 카테고리 등록
export const callInsertBigCategoryApi = ({ bigCategoryName }) => {
    console.log('[CategoryAPICalls] callInsertBigCategoryApi Call');

    const requestURL = `${prefix}/category/insert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                bigCategoryName: bigCategoryName
            })
        }).then((response) => response.json());

        console.log('[CategoryAPICalls] callInsertBigCategoryApi RESULT : ', result);

        dispatch({ type: POST_BIG_CATEGORY, payload: result });

        return result;
    };
};



//  하위 카테고리 등록
export const callInsertSmallCategoryApi = ({ form }) =>{
    console.log('[CategoryAPICalls] callInsertSmallCategoryApi Call');

    const requestURL = `${prefix}/category/insert/small`;

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());

        console.log('[CategoryAPICalls] callInsertSmallCategoryApi RESULT : ', result);

        dispatch({ type: POST_SMALL_CATEGORY, payload: result });
    };
};


//  상위 카테고리 수정
export const callUpdateCategoryApi = ({ form }) => {
    console.log("[CategoryAPICalls] callUpdateCategoryApi Call");

    for (let [key, value] of form.entries()) {
        console.log(`2222${key}: ${value}`);
    }

    const requestURL = `${prefix}/category/update`;
    console.log("requestURL:", requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                Accept: "*/*",
                Authorization:
                    "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: form,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("[CategoryAPICalls] Error:", error);
                throw error;
            });

        if (result.status === 200) {
            console.log(
                "[CategoryAPICalls] callUpdateCategoryApi RESULT:",
                result
            );
            dispatch({ type: PUT_BIG_CATEGORY, payload: result });
        }
    };
};


//  하위 카테고리 수정
export const callUpdateSmallCategoryApi = ({ form }) => {
    console.log("[CategoryAPICalls] callUpdateSmallCategoryApi Call");

    for (let [key, value] of form.entries()) {
        console.log(`2222${key}: ${value}`);
    }

    const requestURL = `${prefix}/category/update/small`;
    console.log("requestURL:", requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                Accept: "*/*",
                Authorization:
                    "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: form,
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("[CategoryAPICalls] Error:", error);
                throw error;
            });

        if (result.status === 200) {
            console.log(
                "[CategoryAPICalls] callUpdateSmallCategoryApi RESULT:",
                result
            );
            dispatch({ type: PUT_SMALL_CATEGORY, payload: result });
        }
    };
};


//  카테고리 전체 삭제
export const callDeleteCategoryApi = ({form}) =>{

    console.log('[CategoryAPICalls] callDeleteCategoryApi Call');

    let requestURL = `${prefix}/category/delete`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());
        
        console.log('[CategoryAPICalls] callDeleteCategoryApi RESULT : ', result);
        dispatch({type: DELETE_CATEGORY, payload: result});
        
    };
};


//  하위 카테고리 삭제
export const callDeleteSmallCategoryApi = ({form}) =>{

    console.log('[CategoryAPICalls] callDeleteSmallCategoryApi Call');

    let requestURL = `${prefix}/category/delete`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());
        
        console.log('[CategoryAPICalls] callDeleteSmallCategoryApi RESULT : ', result);
        dispatch({type: DELETE_SMALL_CATEGORY, payload: result});
        
    };
};