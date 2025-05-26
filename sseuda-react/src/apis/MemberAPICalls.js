// 멤버api
import { POST_LOGIN } from "../modules/MemberModule";

export const callLoginAPI = ( form ) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;
	console.log("폼데이터: ", form);

	return async (dispatch, getState) => {
		try{
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: "*/*"
				},
				body: JSON.stringify({
					username: form.username,
					password: form.password
				})
			});

			console.log("응답 status: ", response.status);

			const result = await response.json();

			console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
		
			if (response.status === 200) {
				console.log("[LoginAPI] 로그인 성공", result)
				window.localStorage.setItem('accessToken', result.accessToken);
				dispatch({type: POST_LOGIN, payload:result});
			} else if (response.status === 401) {
				alert("아이디 또는 비밀번호가 틀렸습니다.");
			} else {
				console.error("예상치 못한 에러 발생:", response.status);
			}
		} catch (error) {
			console.log("로그인 요청 실패!: ", error)
			alert("서버 연결 실패!")
		}
	};

};