import { DELETE_USER_POST, GET_ADMIN_POST, GET_CATEGORY_POST, GET_POST, GET_POSTS, GET_SEARCH_POSTS, GET_USER_CATEGORY_POSTS, GET_USER_POSTS, GET_USER_SEARCH_POSTS, POST_USER_POSTING, PUT_ADMIN_POST, PUT_USER_POSTING, PUT_VIEW_COUNT } from "../modules/PostModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

//  게시글 전체 조회
export const callPostsListApi = () =>{

    let requestURL = `${prefix}/post/all`;
    // console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            // console.log('[PostApiCalls] callPostsListApi RESULT : ', result);
            dispatch({type: GET_POSTS, payload: result.data});
        }
    };
};


//  게시글 상세 조회
export const callPostApi = (postId) =>{

    let requestURL = `${prefix}/post/${postId}`;
    // console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
            'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then((response) => response.json());
        if(result.status === 200){
            // console.log('[PostApiCalls] callPostApi RESULT : ', result);
            dispatch({type: GET_POST, payload: result.data});
        }
    };
};

//  수정된 게시글 상세 조회
export const callAdminPostDetailApi = (postId) => {
  let requestURL = `${prefix}/post/admin?postId=${postId}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_ADMIN_POST, payload: result.data });
      return result.data; // ✅ 이걸 꼭 리턴해야 함!
    } else {
      throw new Error('게시글 조회 실패');
    }
  };
};


//  카테고리별 게시글 조회
export const callCategoryPostsListApi = () =>{

    let requestURL = `${prefix}/post/all/{bigCategoryId}/{smallCategoryId}`;
    // console.log('[PostApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            // console.log('[PostApiCalls] callCategoryPostsListApi RESULT : ', result);
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
  // console.log('[PostApiCalls] requestURL : ', requestURL);

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
      // console.log('[PostApiCalls] callUserPostsListApi RESULT : ', result);
      dispatch({ type: GET_USER_POSTS, payload: result.data });
    } else {
      console.warn('API 호출 실패 또는 결과 없음:', result);
      // 빈 배열로 초기화 하거나 에러 처리
      dispatch({ type: GET_USER_POSTS, payload: [] });
    }
  };
};


//  회원 카테고리별 게시글 전체 조회
export const callUserCategoryPostsListApi = ({ username, smallCategoryId }) => {

  let requestURL = `${prefix}/post/mypage/${username}/${smallCategoryId}`;
  // console.log('[PostApiCalls] requestURL : ', requestURL);

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization:
            'Bearer ' + window.localStorage.getItem('accessToken')
      }
    });

    // 상태코드가 200인지 확인
    if (!response.ok) {
      console.error('API 요청 실패, 상태:', response.status);
      return;
    }

    // 빈 응답을 처리하기 위해 텍스트로 먼저 받음
    const text = await response.text();

    // 빈 문자열이면 빈 객체로 처리
    const result = text ? JSON.parse(text) : {};

    // console.log('[PostApiCalls] callUserCategoryPostsListApi RESULT : ', result);

    // result.data가 있다면 dispatch
    if (result.data) {
      dispatch({ type: GET_USER_CATEGORY_POSTS, payload: result.data });
    } else {
      console.warn('API 응답에 data가 없습니다.');
    }
  };
};


// 검색
export const callSearchPostsApi = (keyword) =>{
  const requestURL = `${prefix}/post/search?keyword=${encodeURIComponent(keyword)}`;
  // console.log('[PostApiCalls] requestURL : ', requestURL);

  return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Accept: '*/*'
          }
      }).then((response) => response.json());
      if(result.status === 200){
          // console.log('[PostApiCalls] callPostsListApi RESULT : ', result);
          // console.log('[PostApiCalls] callPostsListApi RESULT : ', result.data);
          dispatch({type: GET_SEARCH_POSTS, payload: result.data});
      }
  };
};

// 회원별 게시글 검색
export const callUserSearchPostsApi = (keyword, username) =>{
  const requestURL = `${prefix}/post/${username}/search?keyword=${encodeURIComponent(keyword)}`;
  // console.log('[PostApiCalls] requestURL : ', requestURL);

  return async (dispatch, getState) => {
    try {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem("accessToken")
            }
        });

        const text = await response.text();  // ← 먼저 텍스트로 읽음

        if (!text) {
            console.warn("[PostApiCalls] 응답 본문이 비어 있습니다.");
            return;
        }

        const result = JSON.parse(text); // 본문이 있을 때만 파싱

        if (result.status === 200) {
            // console.log('[PostApiCalls] callUserSearchPostsApi RESULT : ', result);
            dispatch({ type: GET_USER_SEARCH_POSTS, payload: result.data });
        } else {
            console.warn("[PostApiCalls] 상태코드가 200이 아닙니다:", result.status);
        }
    } catch (error) {
        console.error("callUserSearchPostsApi 에러 발생:", error);
    }
};
};

// 회원별 게시글 수정
export const callUpdateUserPostingApi = ({ postId, form, username }) =>{
    // console.log('[PostAPICalls] callUpdateUserPostingApi');

    for(let [key, value] of form.entries()){
        console.log(`??${key}: ${value}`);
    }

    const requestURL = `${prefix}/post/${username}/update?postId=${postId}`;
    // console.log("requestURL: ", requestURL);

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem("accessToken")
            },
            body: form,
        }).then((response) => response.json())
        .catch((error) =>{
            console.error("[PostAPICalls] Error: ", error);
            throw error;
        });

        if(result.status === 200){
            // console.log("[CommentAPICalls] callUpdateUserPostingApi RESULT: ", result);
            dispatch({type: PUT_USER_POSTING, payload: result});
        }
        return result;
    };
};


//  회원별 게시글 등록
export const callPostRegistApi = ({form, username}) =>{

    let requestURL = `${prefix}/post/${username}/posting`;
    // console.log('[PostApiCalls] callPostRegistApi Call');

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
            body: form
        }).then((response) => response.json());
        // console.log('[PostApiCalls] callPostRegistApi RESULT : ', result);
        dispatch({type: POST_USER_POSTING, payload: result});
    };
};

//  회원별 게시글 삭제
export const callDeletePostsApi = ({username, postId}) =>{

    // console.log('[PostApiCalls] callDeletePostsApi Call');

    let requestURL = `${prefix}/post/mypage/${username}/delete?postId=${postId}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
            },
        }).then((response) => response.json());
        
        // console.log('[PostApiCalls] callDeletePostsApi RESULT : ', result);
        dispatch({type: DELETE_USER_POST, payload: result});
        
    };
 
};

// 게시글별 조회수 증가
export const callUpdateViewCountApi = ({ postId, username }) => {

  const requestURL = `${prefix}/post/viewCount/${username}/update?postId=${postId}`;
  // console.log('requestURL:', requestURL);

  return async (dispatch) => {
    

    try {
      const response = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization:
                    'Bearer ' + window.localStorage.getItem('accessToken')
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("서버 응답 오류:", errorText);
        throw new Error(`HTTP 에러! status: ${response.status}`);
      }

      // 응답이 없거나 JSON이 아닐 수도 있으므로 체크
      const contentType = response.headers.get("content-type");
      let result = null;

      if (contentType && contentType.includes("application/json")) {
        // JSON 응답일 때만 파싱
        const text = await response.text();
        if (text) {
          result = JSON.parse(text);
        } else {
          result = null; // 빈 응답일 때
        }
      }

      // console.log("조회수 증가 API 응답:", result);

      if (result && result.status === 200 && result.data !== null) {
        dispatch({
          type: PUT_VIEW_COUNT,
          payload: {
            postId,
            viewCount: result.data,
          },
        });
      }

      return result;
    } catch (error) {
      console.error("조회수 증가 API 실패:", error);
      throw error;
    }
  };
};


// 관리자 게시글 상태 수정
export const callAdminPostApi = ({ postId }) =>{
    // console.log('[PostAPICalls] callUpdateUserPostingApi');

    const requestURL = `${prefix}/post/admin/update?postId=${postId}`;
    // console.log("requestURL: ", requestURL);

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer ' + window.localStorage.getItem("accessToken")
            },
        }).then((response) => response.json())
        .catch((error) =>{
            console.error("[PostAPICalls] Error: ", error);
            throw error;
        });

        if(result.status === 200){
            // console.log("[CommentAPICalls] callUpdateUserPostingApi RESULT: ", result);
            dispatch({type: PUT_ADMIN_POST, payload: result});
        }
        return result;
    };
};
