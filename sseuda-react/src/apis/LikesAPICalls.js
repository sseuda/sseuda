import { DELETE_LIKE_DOWN, GET_LIKE, GET_LIKE_BANNER, GET_LIKE_LIST, GET_USER_LIKE_LIST, POST_LIKE_UP } from "../modules/LikesModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

//  좋아요 리스트 전체 조회 (알람 전용)
export const callLikesListApi = (postId) =>{

    let requestURL = `${prefix}/like/allList?postId=${postId}`;
    console.log('[LikesAPI] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[LikesAPI] callLikesListApi RESULT : ', result);
            dispatch({type: GET_LIKE_LIST, payload: result.data});
        }
    };
};

//  회원별 좋아요한 게시글 조회
export const callUserLikesListApi = (username) => {
  return async (dispatch, getState) => {
    const requestURL = `${prefix}/like/${username}/List`;
    console.log('[LikesAPI] requestURL : ', requestURL);

    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 
            'Bearer ' + window.localStorage.getItem('accessToken')
      }
    });
    const result = await response.json();

    if (result.status === 200) {
      console.log('[LikesAPI] callLikesListApi RESULT : ', result);
      dispatch({ type: GET_USER_LIKE_LIST, payload: result.data });
    }

    return result;  // ✅ 꼭 이거 리턴!
  };
};



//  배너 조회
export const callLikeBannerApi = () =>{

    let requestURL = `${prefix}/like/banner`;
    console.log('[LikesApiCalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[LikesApiCalls] callLikeBannerApi RESULT : ', result);
            dispatch({type: GET_LIKE_BANNER, payload: result.data});
        }
    };
};

// 좋아요 전체 단일 조회
export const callLikeApi = (postId) => {
    let requestURL = `${prefix}/like/all?postId=${postId}`;
    console.log('[LikesAPI] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log('[LikesAPI] callLikeApi RESULT : ', result);

            dispatch({ type: GET_LIKE, payload: result.data });

            return result.data;   // ⭐⭐ 여기!!: 좋아요 개수(int) 리턴
        } else {
            console.error('Like API 호출 실패');
            return null;
        }
    };
};


// 회원별 게시글 좋아요 등록
export const callLikeInsertApi = ({ postId, form, username }) => {
  return async (dispatch) => {
    try {
      const requestURL = `${prefix}/like/insert/${username}?postId=${postId}`;
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
        },
        body: form
      });

      const result = await response.json();
      console.log('[callLikeInsertApi RESULT]', result);

      dispatch({ type: POST_LIKE_UP, payload: result });

      return result;
    } catch (error) {
      console.error('callLikeInsertApi ERROR:', error);
      throw error;
    }
  };
};


// 회원별 게시글 좋아요 삭제
export const callPostDeleteApi = ({postId, username}) =>{
    console.log('[LikesAPI] callPostCommentDeleteApi');

    const requestURL = `${prefix}/like/delete/${username}?postId=${postId}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer: ' + window.localStorage.getItem("accessToken")
            }
        }).then((response) => response.json());

        console.log('[LikesAPI] callPostCommentDeleteApi RESULT: ', result);

        dispatch({type: DELETE_LIKE_DOWN, payload: result});
        return result;
    };
};