import { DELETE_USER_POST, GET_CATEGORY_POST, GET_POST, GET_POSTS, GET_USER_CATEGORY_POSTS, GET_USER_POSTS, POST_USER_POSTING } from "../modules/PostModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

//  게시글 전체 조회
export const callPostsListApi = () =>{

    let requestURL = `${prefix}/post/all`;
    console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[PostApiCalls] callPostsListApi RESULT : ', result);
            dispatch({type: GET_POSTS, payload: result.data});
        }
    };
};

//  게시글 상세 조회
export const callPostApi = (postId) =>{

    let requestURL = `${prefix}/post/${postId}`;
    console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[PostApiCalls] callPostApi RESULT : ', result);
            dispatch({type: GET_POST, payload: result.data});
        }
    };
};

//  카테고리별 게시글 조회
export const callCategoryPostsListApi = () =>{

    let requestURL = `${prefix}/post/all/{bigCategoryId}/{smallCategoryId}`;
    console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[PostApiCalls] callCategoryPostsListApi RESULT : ', result);
            dispatch({type: GET_CATEGORY_POST, payload: result.data});
        }
    };
};

//  회원별 게시글 전체 조회
// export const callUserPostsListApi = ({username}) =>{

//     let requestURL = `${prefix}/post/mypage/${username}`;
//     console.log('[PostApiCalls] requestURL : ', requestURL);

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//             }

//         }).then((response) => response.json());
//         if(result.status === 200){
//             console.log('[PostApiCalls] callUserPostsListApi RESULT : ', result);
//             dispatch({type: GET_USER_POSTS, payload: result.data});
//         }
//     };
// };

export const callUserPostsListApi = ({ username }) => {
  let requestURL = `${prefix}/post/mypage/${username}`;
  console.log('[PostApiCalls] requestURL : ', requestURL);

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      }
    });

    // 응답이 비어있으면 빈 배열 처리 (예: 게시글 없을 때)
    const text = await response.text();  // 먼저 텍스트로 읽기
    let result = null;
    try {
      result = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error('JSON 파싱 에러:', e);
      result = null;
    }

    if (result && result.status === 200) {
      console.log('[PostApiCalls] callUserPostsListApi RESULT : ', result);
      dispatch({ type: GET_USER_POSTS, payload: result.data });
    } else {
      console.warn('API 호출 실패 또는 결과 없음:', result);
      // 빈 배열로 초기화 하거나 에러 처리
      dispatch({ type: GET_USER_POSTS, payload: [] });
    }
  };
};


//  회원 카테고리별 게시글 전체 조회
export const callUserCategoryPostsListApi = () =>{

    let requestURL = `${prefix}/post/mypage/{userCode}/{bigCategoryId}/{smallCategoryId}`;
    console.log('[ProductApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[PostApiCalls] callUserCategoryPostsListApi RESULT : ', result);
            dispatch({type: GET_USER_CATEGORY_POSTS, payload: result.data});
        }
    };
};

//  회원별 게시글 등록
export const callPostRegistApi = ({form}) =>{

    let requestURL = `${prefix}/post/{userCode}/posting`;
    console.log('[PostApiCalls] callPostRegistApi Call');

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());
        console.log('[PostApiCalls] callPostRegistApi RESULT : ', result);
        dispatch({type: POST_USER_POSTING, payload: result});
    };
};

//  회원별 게시글 삭제
export const callDeletePostsApi = ({form}) =>{

    console.log('[ProductApiCalls] callDeletePostsApi Call');

    let requestURL = `${prefix}/post/mypage/{userCode}/{postId}/delete`;

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
        
        console.log('[PostApiCalls] callDeletePostsApi RESULT : ', result);
        dispatch({type: DELETE_USER_POST, payload: result});
        
    };
};