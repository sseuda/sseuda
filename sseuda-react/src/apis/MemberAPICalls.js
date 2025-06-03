// 멤버api
import { POST_LOGIN } from "../modules/MemberModule";

const prefix = `http://${process.env.REACT_APP_RESTAPI_IP}:8080`;

// 로그인
export const callLoginAPI = ( form ) => {
	let requestURL = `${prefix}/auth/login`;
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

// 회원가입
export const callSignupAPI = (form) => {
	let requestURL = `${prefix}/member/signup`;
	console.log("회원가입 폼 데이터: ", form);

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: "*/*"
				},
				body: JSON.stringify({
					userFullname: form.userFullname,
					username: form.username,
					password: form.password,
					userNickname: form.userNickname,
					userEmail: form.userEmail,
					userPhone: form.userPhone,
					userStatus: "활성"
				})
			});

			let result = {};
			try {
				const contentType = response.headers.get('Content-Type');
				if (contentType && contentType.includes('application/json')) {
					result = await response.json();
				}
			} catch (e) {
				console.warn("JSON 파싱 실패 또는 응답 없음", e);
			}

			if (response.status === 201 || response.status === 200) {
				alert("회원가입이 완료되었습니다! 로그인해주세요.");
				dispatch({ type: 'POST_SIGNUP', payload: result });
				return { status: response.status, payload: result };
			} else {
				alert(result?.message || "회원가입 중 오류가 발생했습니다.");
				console.error("에러 응답:", result);
				return { status: response.status, payload: result };
			}
			
			const finalResult = { status: response.status, payload: result };
			dispatch({ type: 'POST_SIGNUP', payload: finalResult.payload });
			return finalResult;

		} catch (error) {
			console.log("회원가입 요청 실패!: ", error);
			alert("서버 연결 실패!");
			const errorResult = { status: 500, payload: { message: "서버 연결 실패" } };
			dispatch({ type: 'POST_SIGNUP', payload: errorResult.payload });
			return errorResult;
		}
	};
};

// 아이디 찾기
export const callFindUsernameAPI = (form) => {
	let requestURL = `${prefix}/member/find-username`;

	return async (dispatch, getState) => {
		try {
			const response = await fetch(requestURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*'
				},
				body: JSON.stringify({
					fullname: form.userFullname,
					to: form.userEmail
				})
			});

			const result = await response.text();

			if (response.ok) {
				alert('아이디 찾기 결과가 이메일로 전송되었습니다 :-)');
			} else {
				alert(`아이디 찾기 실패: ${result}`);
			}
		
		} catch (error) {
			console.error('아이디 찾기 중 오류 발생: ', error);
			alert('서버 오류로 아이디 찾기에 실패했습니다.')
		}
	}
}

// 비밀번호 재설정 요청 API
export const callResetPasswordRequestAPI = (email, username) => {
	const requestURL = `/member/reset-password-request`;

	return async () => {
		const response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ email, username })
		});

		const result = await response.text();

		
		if (!response.ok) {
			// HTTP 상태가 400/500번대일 경우
			throw new Error(result);
		}

		return result;
	};
};