import { DELETE_USER_COMMENT, GET_COMMENTS, POST_USER_COMMENT, PUT_USER_COMMENT } from "../modules/CommentModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 게시글별 댓글 전체 조회
export const callPostCommentListApi = (postId) =>{

    let requestURL = `${prefix}/post/comment?postId=${postId}`;
    console.log('[CommentAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*'
            }
        }).then((response) => response.json());
        if(result.status === 200){
            console.log('[CommentAPICalls] callPostCommentListApi RESULT : ', result);
            dispatch({type:GET_COMMENTS, payload: result.data});
        }
    };
};


// 게시글별 특정 회원 댓글 등록
export const callPostCommentRegistApi = ({ postId, form, username }) => {
    return async (dispatch) => {
        try {
            console.log('🔥 보내는 form:', form);
    
            const response = await fetch(
            `${prefix}/post/comment/${username}/input?postId=${postId}`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: JSON.stringify(form)
            }
            );
    
            console.log("건네는 폼??? " , form);
            console.log("요청 url???? " , response);
            const result = await response.json();
            console.log('[🔥 API RESULT]', result);
    
            dispatch({ type: POST_USER_COMMENT, payload: result });
    
            return result;
        } catch (error) {
            console.error('❌ API ERROR:', error);
            throw error;
        }
        };
    };


// 게시글별 특정 회원 댓글 수정
export const callPostCommentUpdateApi = ({ commentId, form, username }) =>{
    console.log('[CommentAPICalls] callPostCommentUpdateApi');

    for(let [key, value] of form.entries()){
        console.log(`??${key}: ${value}`);
    }

    const requestURL = `${prefix}/post/comment/${username}/update?commentId=${commentId}`;
    console.log("requestURL: ", requestURL);

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
            console.error("[CommentAPICalls] Error: ", error);
            throw error;
        });

        if(result.status === 200){
            console.log("[CommentAPICalls] callPostCommentUpdateApi RESULT: ", result);
            dispatch({type: PUT_USER_COMMENT, payload: result});
        }
        return result;
    };
};


// 게시글별 특정 회원 댓글 삭제
export const callPostCommentDeleteApi = ({commentId, username}) =>{
    console.log('[CommentAPICalls] callPostCommentDeleteApi');

    const requestURL = `${prefix}/post/comment/${username}/delete?commentId=${commentId}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                Accept: '*/*',
                Authorization:
                    'Bearer: ' + window.localStorage.getItem("accessToken")
            }
        }).then((response) => response.json());

        console.log('[CommentAPICalls] callPostCommentDeleteApi RESULT: ', result);

        dispatch({type: DELETE_USER_COMMENT, payload: result});
        return result;
    };
};
