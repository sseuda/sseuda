// 멤버api
import { POST_LOGIN } from "../modules/MemberModule";

export const callLoginAPI = ({ form }) => {
	const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accecpt: "*/*",
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				username: form.username,
				password: form.password
			})
		}).then((response) => response.json());
	
		console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
		if (result.status === 200) {
			window.localStorage.setItem('accessToken', result.data.accessToken);
		} else if (result.status === 400) {
			alert(result.message); // 로그인 실패 시 메시지를 alert로 표시
		}
		dispatch({ type: POST_LOGIN, payload: result });
	};

}